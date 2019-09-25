import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing all endpoints: ', () => {
  it('Should create a book', done => {
    const book = {
      title: 'Factory Settings',
      price: '$4.00',
      description: 'Its all about resetting to factory settings'
    };

    chai
      .request(app)
      .post('/api/v1/books')
      .set('Accept', 'application/json')
      .send(book)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          title: book.title,
          price: book.price,
          description: book.description
        });
        done();
      });
  });

  it('Should not create a book with incomplete parameters', done => {
    const book = {
      price: '$15',
      description: 'yope yope'
    };

    chai
      .request(app)
      .post('/api/v1/books')
      .set('Accept', 'application/json')
      .send(book)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Should get all books', done => {
    chai
      .request(app)
      .get('/api/v1/books')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('title');
        res.body.data[0].should.have.property('price');
        res.body.data[0].should.have.property('description');
        done();
      });
  });

  it('Should get a particular book', done => {
    const bookId = 1;

    chai
      .request(app)
      .get(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('price');
        res.body.data.should.have.property('description');
        done();
      });
  });

  it('Should not get a particular book with invalid id', done => {
    const bookId = 8888;

    chai
      .request(app)
      .get(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`Cannot find book with the id ${bookId}`);
        done();
      });
  });

  it('It should not get a particular book with non-numeric id', done => {
    const bookId = 'aaa';
    chai
      .request(app)
      .get(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('Should update a book', done => {
    const bookId = 1;
    const updatedBook = {
      id: bookId,
      title: 'sofware engineer 1',
      price: '$10.99',
      description: 'We have updated the price'
    };

    chai
      .request(app)
      .put(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedBook.id);
        expect(res.body.data.title).equal(updatedBook.title);
        expect(res.body.data.price).equal(updatedBook.price);
        expect(res.body.data.description).equal(updatedBook.description);
        done();
      });
  });

  it('Should no t update a book with invalid id', done => {
    const bookId = '9999';
    const updatedBook = {
      id: bookId,
      title: 'Updated Awesome book again',
      price: '$11.99',
      description: 'We have updated the price'
    };
    chai
      .request(app)
      .put(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`Cannot find book with the id: ${bookId}`);
        done();
      });
  });

  it('Should not update a book with non-numeric id value', done => {
    const bookId = 'ggg';
    const updatedBook = {
      id: bookId,
      title: 'Updated Awesome book again',
      price: '$11.99',
      description: 'We have updated the price'
    };
    chai
      .request(app)
      .put(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('Should delete a book', done => {
    const bookId = 1;
    chai
      .request(app)
      .delete(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('Should not delete a book with invalid id', done => {
    const bookId = 777;
    chai
      .request(app)
      .delete(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`Book with the id ${bookId} cannot be found`);
        done();
      });
  });

  it('Should not delete a book with non-numeric id', done => {
    const bookId = 'bbb';
    chai
      .request(app)
      .delete(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('Please provide a numeric value');
        done();
      });
  });
});
