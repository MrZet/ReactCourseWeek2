import {render, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import EditableTimebox from '../../components/EditableTimebox'

describe('<EditableTimebox/>', () => {

    afterEach(cleanup);
    it('shows edit button', () => {
        const {getByText} = render(<EditableTimebox/>);
        expect(()=>getByText("Edit")).not.toThrow();
    });

    it('allow editing timebox', () => {        
        const {debug, getByText} = render(<EditableTimebox/>);
        fireEvent.click(getByText("Edit"))
        //debug();
        fireEvent.click(getByText(/changes/))
        expect(()=>getByText("Edit")).not.toThrow();
    });
})
