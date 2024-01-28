from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from sqlalchemy import select
from sqlalchemy.orm import aliased, lazyload
from typing import List

db = SQLAlchemy()

class Puzzle(db.Model):
   id = db.Column(db.Integer, primary_key = True)
   flag = db.Column(db.String(32), nullable=True)
   label = db.Column(db.String(10), unique=True, nullable=False)

    #optional todo: map one to many Group -> Badge
   def __init__(self, flag, label ):
       self.flag = flag
       self.label = label

class Group(db.Model):
   id = db.Column(db.Integer, primary_key = True)
   description = db.Column(db.String(32), unique=True, nullable=False)
   points = db.Column(db.Integer, nullable=False)
   max_tags = db.Column(db.Integer, nullable=False)
   points_after_max = db.Column(db.Integer, nullable=False)
   can_tag = db.Column(db.Boolean)

    #optional todo: map one to many Group -> Badge
   def __init__(self, description, points, max_tags, points_after_max=1, can_tag=True):
       self.description = description
       self.points = points
       self.max_tags = max_tags
       self.points_after_max = points_after_max
       self.can_tag = can_tag

class Badge(db.Model):
   id = db.Column(db.Integer, primary_key = True)
   token = db.Column(db.String(32), unique=True, nullable=False)
   serial = db.Column(db.String(32), unique=False, nullable=True)
   nickname = db.Column(db.String(100), nullable=False)
   group_id = db.Column(db.ForeignKey(Group.id), nullable=False)
   group = db.relationship(Group, backref='badges')

    #todo: fix so this doesn't show everyone's
   # use many to many
   """solves = db.relationship("Puzzle",
                        secondary="solve",
                        primaryjoin="Puzzle.id==solve.c.puzzle_id",
                        secondaryjoin="Badge.id==solve.c.badge_id",
                        backref="solver"
    )"""
   solves: db.Mapped[List[Puzzle]] = db.relationship("Puzzle", secondary="solve")

   tags = db.relationship("Badge",
                        secondary="tag",
                        primaryjoin="Badge.id==tag.c.tagger_id",
                        secondaryjoin="Badge.id==tag.c.tagged_id",
                        backref="tagger"
    )
   
   @property
   def score_details(self):
            
        #tags_rc = RelationshipCache(Badge.tags, cache)
        #solves_rc = RelationshipCache(Badge.solves, cache)
        #cached_self = self.query.options(lazyload(Badge.solves), solves_rc).get()
        #cached_self = cached_self.query.options(lazyload(Badge.tags), tags_rc).get()

        if not self.group.can_tag:
            return 0, None, None, []
        else:
            total_score = 0
            tags_by_group = {}
            points_by_group = {}
            if self.tags:
                for tag in self.tags:
                    tag_group = tag.group
                    tag_count = tags_by_group.get(tag_group.description,0)
                    tag_count += 1
                    tags_by_group[tag_group.description] = tag_count
                    if tag_count > tag_group.max_tags:
                        tag_score = tag_group.points_after_max
                    else:
                        tag_score = tag_group.points
                    group_points = points_by_group.get(tag_group.description,0)
                    points_by_group[tag_group.description] = group_points+tag_score
                    total_score += tag_score
            return total_score, tags_by_group, points_by_group, len(self.solves)

   @property
   def score(self):
      result, tags_by_group, _, puzzle_count = self.score_details
      total_count = 0
      if tags_by_group:
        for group in tags_by_group.keys():
            total_count += tags_by_group[group]
      return result, total_count, puzzle_count


   def __init__(self, token, nickname, group, serial=""):
       self.token = token
       self.nickname = nickname
       self.serial = serial
       self.group = db.session.query(Group).filter(Group.description == group).first()

class Solve(db.Model):
   id = db.Column(db.Integer, primary_key = True)
   ip = db.Column(db.String(40))
   timestamp = db.Column(db.DateTime(timezone=True), server_default=func.now())
   puzzle_id = db.Column(db.ForeignKey(Puzzle.id), nullable=False)
   puzzle = db.relationship(Puzzle, foreign_keys=[Puzzle.id], 
                            primaryjoin="Puzzle.id==Solve.puzzle_id", backref="solves")
   badge_id = db.Column(db.ForeignKey(Badge.id), nullable=False)
   #solver = db.relationship(Badge, foreign_keys=[Badge.id],
   #                         primaryjoin="Badge.id==Solve.badge_id")
   
   __table_args__ = (
       db.UniqueConstraint('puzzle_id', 'badge_id', name='_unique_solve'),
    )

   def __init__(self, puzzle_id, badge_id, ip):
       self.puzzle_id = puzzle_id
       self.badge_id = badge_id
       self.ip = ip

class Tag(db.Model):
   id = db.Column(db.Integer, primary_key = True)
   ip = db.Column(db.String(40))
   timestamp = db.Column(db.DateTime(timezone=True), server_default=func.now())
   tagged_id = db.Column(db.ForeignKey(Badge.id), nullable=False)
   tagged = db.relationship(Badge, foreign_keys=[Badge.id], 
                            primaryjoin="Badge.id==Tag.tagged_id", backref="tagged")
   tagger_id = db.Column(db.ForeignKey(Badge.id), nullable=False)
   #tagger = db.relationship(Badge, foreign_keys=[Badge.id],
   #                         primaryjoin="Badge.id==Tag.tagger_id", backref="tags")
   
   __table_args__ = (
       db.UniqueConstraint('tagger_id', 'tagged_id', name='_unique_tag'),
    )

   def __init__(self, tagger, tagged, ip):
       self.tagger_id = tagger
       self.tagged_id = tagged
       self.ip = ip

