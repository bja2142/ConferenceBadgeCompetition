from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

db = SQLAlchemy()



class Badge(db.Model):
   id = db.Column(db.Integer, primary_key = True)
   token = db.Column(db.String(20), unique=True, nullable=False)
   nickname = db.Column(db.String(100), nullable=False)
   value = db.Column(db.Integer, nullable=False)

   def __init__(self, token, nickname, value=1):
       self.token = token
       self.nickname = nickname
       self.value = value

class Tag(db.Model):
   id = db.Column(db.Integer, primary_key = True)
   tagger = db.mapped_column(db.ForeignKey('badge.id'), nullable=False)
   tagged = db.mapped_column(db.ForeignKey('badge.id'), nullable=False)
   ip = db.Column(db.String(40))
   timestamp = db.Column(db.DateTime(timezone=True), server_default=func.now())
   
   __table_args__ = (
       db.UniqueConstraint('tagger', 'tagged', name='_unique_tag'),
    )

   def __init__(self, tagger, tagged, ip):
       self.tagger = tagger
       self.tagged = tagged
       self.ip = ip

