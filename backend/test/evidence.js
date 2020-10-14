process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Evidence = require('../models/evidence')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
var expect = chai.expect;
chai.should();

chai.use(chaiHttp);

before(function (done) {
  mongoose.connect('mongodb+srv://seer:seer@cluster0.dhyor.mongodb.net/SEER?retryWrites=true&w=majority');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function() {
    console.log('We are connected to test database!');
    done();
  });
});
/*
  * Test the /POST route
  */
 describe('/POST Evidence', () => {
    it('it should POST a article ', (done) => {
        let evidence = {
            typeOfPaper: "Article",
            title: "Testing",
            author: "Testing",
            source: "IEEE",
            yearOfPublication: "2016",
            doiLink: "testlink",
            status: "Pending Review",
            dateOfSubmission: "2020-10-13"
        }
      chai.request('http://localhost:5000')
          .post('/evidence/add')
          .send(evidence)
          .end((err, res) => {
            expect(200)
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property('title')
            expect(res.body.title).to.eq('Testing')
            expect(res.body).to.have.property('typeOfPaper')
            expect(res.body).to.have.property('author')
            expect(res.body).to.have.property('source')
            expect(res.body).to.have.property('yearOfPublication')
            expect(res.body).to.have.property('doiLink')
            expect(res.body).to.have.property('dateOfSubmission')
            done();
          });
    });

});

describe('/GET all evidences', () => {
  it('it should GET all the articles', (done) => {
    chai.request('http://localhost:5000')
        .get('/evidence/evidences/all')
        .end((err, res, body) => {
         expect(res.status).to.equal(200)
         expect(res.body).to.be.a("array")
          done();
        });
  });
});

describe('/GET pending evidences', () => {
  it('it should GET all the articles pending for review', (done) => {
    chai.request('http://localhost:5000')
        .get('/evidence/evidences/pending')
        .end((err, res, body) => {
         expect(res.status).to.equal(200)
         expect(res.body).to.be.a("array")
          done();
        });
  });
});

describe('/GET/:id evidence', () => {
  it('it should GET an article by the given id', (done) => {
        const id = "5f8670fe5442996086082dde"
          chai.request('http://localhost:5000')
        .get('/evidence/update/' + id)
        .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body).to.have.property('_id')
            expect(res.body._id).to.eq(id)
          done();
        });
      });

  });

describe('/GET evidence for search', () => {
  it('it should GET all the evidences matching the search criteria', (done) => {
    chai.request('http://localhost:5000')
        .get('/evidence/?search=TDD&search1=Improve Code Quality')
        .end((err, res, body) => {
         expect(res.status).to.equal(200)
         expect(res.body).to.be.a("array")
          done();
        });
  });
});

describe('/PUT/:id evidence', () => {
  it('it should UPDATE an article given the id', (done) => {
         const id = "5f8670fe5442996086082dde"
         chai.request('http://localhost:5000')
         .put('/evidence/' + id)
         .send({status: "Accepted"})
         .end((err, res) => {
         expect(res.status).to.equal(200)
         expect(res.body).to.have.property('msg').to.eq('Updated successfully');
         done();
       });
      });
  });
