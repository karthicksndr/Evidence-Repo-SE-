import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	findRenderedDOMComponentWithClass,
	scryRenderedComponentsWithType
} from 'react-dom';
import App from './App';


// arrange: require user
const chai = require('chai');
const expect = chai.expect;
const User = require('../../backend/models/user');
const Evidence = require('../../backend/models/evidence');
const EvidenceList = require('../src/components/moderator/evidencelist');

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// act: create user
const validUser = new User({
  firstName: 'Test',
  lastName: 'Doe',
  email: 'test@testdoe.com',
  password: '123456'
});

// assert: test user
describe('Create valid user', () => {
  it('should be a valid object', function () {
    expect(validUser).to.be.an('object');
    expect(validUser).to.not.be.undefined;
    expect(validUser).to.have.property('firstName');
  });
});

// act: create evidence
const validEvidence = new Evidence({
  typeOfPaper: 'Case Study',
  title: 'Test Driven Development',
  author: 'Test Author',
  source: 'ACM',
  yearOfPublication: '2016',
  doiLink : 'testdoilink/2016'
});

// assert: test validEvidence
describe('Create valid evidence', () => {
  it('should be a valid object', function () {
    expect(validEvidence).to.be.an('object');
    expect(validEvidence).to.not.be.undefined;
    expect(validEvidence).to.have.property('title');
  });

  describe('Create valid evidence', () => {
    it('should be a valid object', function () {
      expect(validEvidence).to.be.an('object');
      expect(validEvidence).to.not.be.undefined;
      expect(validEvidence).to.have.property('doiLink');
    });

  });
});

// describe('EvidenceList', () => {
// 	it('should render a div with "evidence-list" class', () => {
// 		const evidence = [];
// 		const component = renderIntoDocument(
// 			<EvidenceList
// 				evidence={evidence}
// 			/>
// 		);
// 		const evidencelistEle = findRenderedDOMComponentWithClass(component, 'evidencelist');

// 		expect(evidencelistEle).to.be.ok;
//   });
  
// });