const expect = require('chai').expect;
const app= require('../app');
const request = require('supertest');

describe('App', ()=>{
    it('GET /apps should return a message', ()=>{
        return request(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
    })
    it('Should return an array of objects',()=>{
        return request(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type',/json/)
        .then(res=>{
            expect(res.body).to.be.an('array')
        });
    })

    it('Should be 400 if sort is incorrect',()=>{
        return request(app)
        .get('/apps')
        .query({sort:'jhkhj'})
        .expect(400,'Sort must be either Rating or App')

    });
    it('Should sort by rating',()=>{
        return request(app)
        .get('/apps')
        .query({sort:'Rating'})
        .expect(200)
        .expect('Content-Type',/json/)
        .then(res=>{
            expect(res.body).to.be.an('array');
            let i=0;
            let sorted= true;
            while(sorted && i< res.body.length -1){
                sorted= sorted && res.body[i].title <res.body[i + 1].title;
                i++;
            }
            expect(sorted).to.be.true;


        })

    });
});