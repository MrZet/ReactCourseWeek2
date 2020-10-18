import {getMinutesAndSecondsFromTimeGivenInSeconds} from '../../lib/time'

describe("getMinutesAndSecondsFromTimeGivenInSeconds",()=>{
test("function works for 30 seconds.",()=>{
    expect(getMinutesAndSecondsFromTimeGivenInSeconds(30)).toEqual([0,30]);
})

test("function returns 30 seconds for 30 second duration.",()=>{
    expect(getMinutesAndSecondsFromTimeGivenInSeconds(30)[1]).toBe(30);
})

test("function returns 0 minutes for 30 second duration.",()=>{
    expect(getMinutesAndSecondsFromTimeGivenInSeconds(30)[0]).toBe(0);
})

test("function works for 140 seconds.",()=>{
    expect(getMinutesAndSecondsFromTimeGivenInSeconds(140)).toEqual([2,20]);
})

})