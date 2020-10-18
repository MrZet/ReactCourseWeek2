import React from 'react'
import Clock from '../../components/Clock'
import ReactDOM from 'react-dom'

var root = null;

describe('<Clock/>', () => {
    describe('When given time parts',()=>{
        beforeEach(()=>{
            root = document.createElement("div");
            ReactDOM.render(<Clock hours={12} minutes={13} />, root);
        })
        it('render and put H2 element', () => {
            expect(root.childNodes[0].nodeName).toEqual('H2')
        });   
        it('sets a Clock class name', () => {
            expect(root.childNodes[0].className).toMatch(/Clock/)
        });   
        it('renders time properly', () => {
            expect(root.childNodes[0].textContent).toMatch(/12:13/)
        });   
    });
})

