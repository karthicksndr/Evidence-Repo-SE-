import React from 'react';
import { render } from '@testing-library/react';
import Success from './analystComplete';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link,MemoryRouter as Router } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe("homescreen has a title" , () => {
    
    test("render title" , () => {
    const wrapper= shallow(<Success />)
    expect(wrapper.find("h2").text()).toContain("Software Engineering Evidence Repository - SEER")
    })

    test("Link routes to /analyst component " , () => {
        const wrapper= shallow(<Success />)
        expect(wrapper.find(Link)).toBeTruthy();
        expect(wrapper.find('Link').prop('to')).toEqual('/analyst')
    })

});