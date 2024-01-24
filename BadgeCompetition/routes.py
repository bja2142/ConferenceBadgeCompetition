from flask import Blueprint, render_template, abort, request, jsonify
from json import dumps
from sqlalchemy.sql import func
from sqlalchemy import select
from sqlalchemy.orm import aliased

from BadgeCompetition.models import (
    Badge,
    Tag,
    Group,
    db
)


pages = Blueprint('pages', __name__,
                        template_folder='templates')

@pages.route('/', methods = ["GET"])
def index():
    return render_template("index.html")

@pages.route('/scoreboard', methods = ["POST"])
def scoreboard():
    auth_token = request.form.get("token", False)
    authorized = False
    if auth_token:
        result = db.session.query(Badge) \
            .filter(Badge.token == auth_token)\
            .first()
        authorized = result != None
    if not authorized:
        return jsonify("unauthorized")
    
    scores = []
    result = db.session.query(Badge).join(Group)
    
    for row in result:
        score, count = row.score
        if score > 0:
            scores.append({
                "id": row.id,
                "score": score,
                "nick" : row.nickname,
                "count" : count
                    })
        print(row.score)
    scores.sort(key=lambda entry: entry["score"])
    return jsonify(scores)


@pages.route('/profile/<int:id>', methods = ["POST"])
def profile(id):
    auth_token = request.form.get("token", False)
    authorized = False
    if auth_token:
        result = db.session.query(Badge) \
            .filter(Badge.token == auth_token)\
            .first()
        authorized = result != None
    if not authorized:
        return jsonify("unauthorized")
    
    response = {}
    user= db.session.query(Badge).join(Group).filter(Badge.id == int(id)).first()
    if user:
        total_score, tags_by_group, points_by_group = user.score_details
        response = {
            "total_score": total_score,
            "tags_by_group": tags_by_group,
            "points_by_group" : points_by_group,
            "nickname" : user.nickname,
            "group" : user.group.description
        }
    return jsonify(response)





@pages.route('/tag', methods = ["POST"])
def tag():
    ip = request.remote_addr
    taggerBadge = aliased(Badge)
    taggedBadge = aliased(Badge)
    tagger = request.form.get("tagger", False)
    tagged = request.form.get("tagged", False)
    if ip and tagger and tagged:
        try:
            tagged = Tag(
                        tagger=select(taggerBadge.id).filter_by(token=tagger),
                        tagged=select(taggedBadge.id).filter_by(token=tagged),
                        ip=ip
                    )
            db.session.add(tagged)
            db.session.commit()
        except Exception as err:
            if "UNIQUE" in str(err):
                return "duplicate"
            else:
                return "invalid"

        return "success"    
    
    return abort(404)




