from flask import Blueprint, render_template, abort, request, jsonify
from json import dumps
from sqlalchemy.sql import func
from sqlalchemy import select
from sqlalchemy.orm import aliased
from flask_caching import Cache

cache = Cache(config={'CACHE_TYPE': 'SimpleCache'})

from hashlib import sha256

from BadgeCompetition.models import (
    Badge,
    Tag,
    Group,
    Puzzle,
    Solve,
    db
)



pages = Blueprint('pages', __name__,
                        template_folder='templates')

def build_flag(token: str, salt: str) -> str:
    return sha256((token + salt).encode())\
            .hexdigest()[:16]


@pages.route('/', methods = ["GET"])
def index():
    return render_template("index.html")

def handle_puzzle_request(request, token):
    serial = request.form.get("serial", False)
    if serial:
        serial = serial.lower()
        serial = serial.replace(":","")
    flag1 = request.form.get("flag1", False)
    flag2 = request.form.get("flag2", False)
    flag3 = request.form.get("flag3", False)
    flag4 = request.form.get("flag4", False)
    print(flag1,flag2,flag3,flag4)
    ip = request.remote_addr
    valid_match = db.session.query(Badge) \
            .filter(Badge.token == token)\
            .first()
    print(valid_match, "valid match")
    if not valid_match:
        return False, False
    if serial:
        print(valid_match.serial, serial)
        if valid_match.serial == serial:
            puzzle_id = db.session.query(Puzzle.id) \
            .filter(Puzzle.label == "level0")\
            .first()[0]
            solved = Solve(
                        puzzle_id=puzzle_id,
                        badge_id=valid_match.id,
                        ip=ip
                    )
            db.session.add(solved)
            try:
                db.session.commit()
            except Exception as e:
                print(e)
                db.session.rollback()
            return True, "level0"
    if flag1:
        print("flag1", flag1)
        flag, puzzle_id = db.session.query(Puzzle.flag, Puzzle.id) \
            .filter(Puzzle.label == "level1")\
            .first()
        print("flag", flag, "puzzle id", puzzle_id)
        if flag1 == flag:
            solved = Solve(
                        puzzle_id=puzzle_id,
                        badge_id=valid_match.id,
                        ip=ip
                    )
            db.session.add(solved)
            try:
                db.session.commit()
            except Exception as e:
                print(e)
                db.session.rollback()
        return True, "level1"
    elif flag2:
        print(flag2)
        flag, puzzle_id = db.session.query(Puzzle.flag, Puzzle.id) \
            .filter(Puzzle.label == "level2")\
            .first()
        expected_flag = build_flag(token, flag)
        print(flag, flag2, expected_flag, puzzle_id)
        
        if flag2 == expected_flag:
            solved = Solve(
                        puzzle_id=puzzle_id,
                        badge_id=valid_match.id,
                        ip=ip
                    )
            db.session.add(solved)
            try:
                db.session.commit()
            except Exception as e:
                print(e)
                db.session.rollback()
        return True, "level2"
    elif flag3:
        print(flag3)
        flag, puzzle_id = db.session.query(Puzzle.flag, Puzzle.id) \
            .filter(Puzzle.label == "level3")\
            .first()
        expected_flag = build_flag(token, flag)
        print(flag, flag3, expected_flag, puzzle_id)
        
        if flag3 == expected_flag:
            solved = Solve(
                        puzzle_id=puzzle_id,
                        badge_id=valid_match.id,
                        ip=ip
                    )
            db.session.add(solved)
            try:
                db.session.commit()
            except Exception as e:
                print(e)
                db.session.rollback()
        return True, "level3"
        
    elif flag4:
        print(flag4)
        flag, puzzle_id = db.session.query(Puzzle.flag, Puzzle.id) \
            .filter(Puzzle.label == "level4")\
            .first()
        expected_flag = build_flag(token, flag)
        print(flag, flag4, expected_flag, puzzle_id)
        
        if flag4 == expected_flag:
            solved = Solve(
                        puzzle_id=puzzle_id,
                        badge_id=valid_match.id,
                        ip=ip
                    )
            db.session.add(solved)
            try:
                db.session.commit()
            except Exception as e:
                print(e)
                db.session.rollback()
        return True, "level4"
    return False, None

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
        results = handle_puzzle_request(request, token)
    response = {
        "token" : token,
        "msg" : "test"
    }
    badge =  db.session.query(Badge) \
            .filter(Badge.token == token).first()
    solves = badge.solves
    print(solves)
    for solve in solves:
        response[solve.label] = True
        print(solve.label)
    #get progress for user
    #process flags
    return render_template("puzzle.html",**response)

@pages.route('/scoreboard', methods = ["POST"])
@cache.cached(timeout=5)
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
    scores.sort(key=lambda entry: entry["score"], reverse=True)
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




