from flask import Blueprint, render_template, abort, request, jsonify
from json import dumps
from sqlalchemy.sql import func
from sqlalchemy import select
from sqlalchemy.orm import aliased

from BadgeCompetition.models import (
    Badge,
    Tag,
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
    taggerBadge = aliased(Badge)
    taggedBadge = aliased(Badge)
    score = func.sum(taggedBadge.value).label('score')
    count = func.count(taggedBadge.value).label('score')
    result = db.session.query(Tag, 
            score, 
            taggerBadge.nickname,
            count) \
        .join(taggerBadge, Tag.tagger == taggerBadge.id) \
        .join(taggedBadge, Tag.tagged == taggedBadge.id) \
        .group_by(Tag.tagger) \
        .order_by(score.desc())
    print(result.statement)
    for row in result:
        print(row)
        scores.append({
            "id": row[0].tagger,
            "score": row[1],
            "nick" : row[2],
            "count" : row[3]
                })
    return jsonify(scores)




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




