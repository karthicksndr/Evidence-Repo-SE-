import React from 'react';
import { render } from '@testing-library/react';
import Loginscreen from './userpage';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link,MemoryRouter as Router } from 'react-router-dom';

configure({ adapter: new Adapter() });


describe("homescreen has a title" , () => {
    
    test("render title" , () => {
    const wrapper= shallow(<Loginscreen />)
    expect(wrapper.find("h2").text()).toContain("Software Engineering Evidence Repository - SEER")
});

    test("link routes to /submit evidence component" , () => {
        const wrapper= shallow(<Loginscreen />)
        expect(wrapper.find(Link)).toBeTruthy();
        expect(wrapper.find('Link').prop('to')).toEqual('/SubmitEvidence')
    })
  
});


