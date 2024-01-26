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

def handle_puzzle_request(serial, flag1, flag2, flag3, flag4):
    pass

@pages.route('/nick', methods = ["POST"])
def nick():
    auth_token = request.form.get("token", False)
    authorized = False
    if auth_token:
        result = db.session.query(Badge) \
            .filter(Badge.token == auth_token)\
            .first()
        authorized = result != None
    if not authorized:
        return jsonify("unauthorized")
    return jsonify({"nickname": result.nickname, "id": result.id})

@pages.route('/puzzle', methods = ["GET"])
def puzzle_index():
    return render_template("puzzle_index.html")

@pages.route('/puzzle/<token>', methods = ["GET", "POST"])
def puzzle(token):
    print(token, len(token))
    if len(token) < 20:
        return render_template("puzzle_index.html")
    result = db.session.query(Badge) \
        .filter(Badge.token == token)\
        .first()
    print(token, result)
    authorized = result != None
    if not authorized:
        return abort(404)
   
    if request.method == 'POST':
        serial = request.form.get("serial", False)
        if serial:
            serial = serial.lower()
        flag1 = request.form.get("flag1", False)
        flag2 = request.form.get("flag2", False)
        flag3 = request.form.get("flag3", False)
        flag4 = request.form.get("flag4", False)
        results = handle_puzzle_request(serial, flag1, flag2, flag3, flag4)
    #get progress for user
    #process flags
    return render_template("puzzle.html", data=results)

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
        score, count, puzzle = row.score
        if score > 0:
            scores.append({
                "id": row.id,
                "score": score,
                "nick" : row.nickname,
                "count" : count,
                "puzzle": puzzle
                    })
        #print(row.score)
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
        print(user.solves)
        total_score, tags_by_group, points_by_group, puzzle_count = user.score_details
        response = {
            "total_score": total_score,
            "tags_by_group": tags_by_group,
            "points_by_group" : points_by_group,
            "nickname" : user.nickname,
            "group" : user.group.description,
            "puzzles": puzzle_count
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




