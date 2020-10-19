import React from 'react'
import Clock from '../../components/Clock'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

var root = null;
var clockRenderer = null;

describe('<Clock/>', () => {
    describe('When given time parts (DOM)',()=>{
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

    describe('When given time parts (REACT-TEST-RENDERER)',()=>{
        beforeEach(()=>{
            clockRenderer = renderer.create(
                <Clock hours={12} minutes={13} />
            );
        })
        it('render properly', () => {
            expect(clockRenderer.toJSON()).toMatchSnapshot();
        });
        it('render and put H2 element', () => {
            expect(root.childNodes[0].nodeName).toEqual('H2')
        });   
        it('sets a Clock class name', () => {
            expect(clockRenderer.toJSON().props).toMatchObject({"className": expect.stringMatching(/Clock/)});
        });   
        it('renders time properly', () => {
            expect(clockRenderer.toJSON().children).toEqual(expect.arrayContaining(["12","13"]))
        });   
    });
})

