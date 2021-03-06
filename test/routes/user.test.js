let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../app");
const agent = chai.request.agent(app);
const db = require("../../models");
chai.use(chaiHttp);
chai.should();

module.exports = function() {
  const userA = {
    email: "AlphaTest@user.com",
    displayName: "Alpha Test",
    username: "AlphaTest",
    password: "AlphaTest42"
  };
  const userB = {
    email: "BetaTest@user.com",
    displayName: "Beta Test",
    username: "BetaTest",
    password: "BetaTest42"
  };

  before(done => {
    db.User.destroy({ where: {} }).then(() => {
      agent
        .post("/register")
        .send(userA)
        .end((err, res) => {
          userA.id = res.body.id;
          agent.post("/logout").end(() => {
            agent
              .post("/register")
              .send(userB)
              .end((err, res) => {
                userB.id = res.body.id;
                done();
              });
          });
        });
    });
  });

  beforeEach(done => {
    agent.post("/logout").end(() => done());
  });

  /**
   * FOLLOW ROUTE
   */
  describe("GET /follow -> follow route", () => {
    it("it should return a error as no user is currently logged in", done => {
      agent
        .post("/user/follow")
        .send({ userId: userB.id })
        .end((err, res) => {
          res.should.have.status(401);
          res.error.text.should.be.eql("Error : NOT_LOGGED_IN");
          done();
        });
    });

    it("it should follow another user", done => {
      agent
        .post("/login")
        .send({ username: userA.username, password: userA.password })
        .end((err, res) => {
          agent
            .post("/user/follow")
            .send({ userId: userB.id })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.be.eql("SUCCESSFULLY_FOLLOWED");
              done();
            });
        });
    });

    it("throw error if you try to follow yourself", done => {
      agent
        .post("/login")
        .send({ username: userA.username, password: userA.password })
        .end((err, res) => {
          agent
            .post("/user/follow")
            .send({ userId: userA.id })
            .end((err, res) => {
              res.should.have.status(403);
              res.error.text.should.be.eql("Error : CANNOT_FOLLOW_YOURSELF");
              done();
            });
        });
    });

    it("throw error if you try to follow non-existant user", done => {
      agent
        .post("/login")
        .send({ username: userA.username, password: userA.password })
        .end((err, res) => {
          agent
            .post("/user/follow")
            .send({ userId: -1 })
            .end((err, res) => {
              res.should.have.status(404);
              res.error.text.should.be.eql("Error : USER_DOES_NOT_EXIST");
              done();
            });
        });
    });
  });

  /**
   * UNFOLLOW ROUTE
   */
  describe("DELETE /follow -> unfollow route", () => {
    it("it should return a error as no user is currently logged in", done => {
      agent.delete(`/user/follow/${userB.id}`).end((err, res) => {
        res.should.have.status(401);
        res.error.text.should.be.eql("Error : NOT_LOGGED_IN");
        done();
      });
    });

    it("it should unfollow a user", done => {
      agent
        .post("/login")
        .send({ username: userA.username, password: userA.password })
        .end((err, res) => {
          agent
            .post(`/user/follow`)
            .send({ userId: userB.id })
            .end(() => {
              agent.delete(`/user/follow/${userB.id}`).end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql("SUCCESSFULLY_UNFOLLOWED");
                done();
              });
            });
        });
    });

    it("throw error if you try to unfollow yourself", done => {
      agent
        .post("/login")
        .send({ username: userA.username, password: userA.password })
        .end((err, res) => {
          agent.delete(`/user/follow/${userA.id}`).end((err, res) => {
            res.should.have.status(403);
            res.error.text.should.be.eql("Error : CANNOT_UNFOLLOW_YOURSELF");
            done();
          });
        });
    });

    it("throw error if you try to unfollow non-existant user", done => {
      agent
        .post("/login")
        .send({ username: userA.username, password: userA.password })
        .end((err, res) => {
          agent.delete(`/user/follow/${-1}`).end((err, res) => {
            res.should.have.status(404);
            res.error.text.should.be.eql("Error : USER_DOES_NOT_EXIST");
            done();
          });
        });
    });
  });
};
