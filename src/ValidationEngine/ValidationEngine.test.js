import React, { useReducer } from "react";
import { validateChainAndCycle,validateDuplicateAndFork,validateEntry,validateDictionary } from './ValidationEngine'

it('validateDuplicateAndFork picks up duplicate', () => {
    var dictionary = [
        {range: 'AIK', domain: 'DIF'},
    ]
    var newEntry = {range: 'AIK', domain: 'DIF'}
    expect(validateDuplicateAndFork(newEntry, dictionary)).toEqual('duplicate');
})

it('validateDuplicateAndFork picks up fork', () => {
    var dictionary = [
        {domain: 'AIK', range: 'AIK'},
    ]
    var newEntry = {domain: 'AIK', range: 'DIF',}
    expect(validateDuplicateAndFork(newEntry, dictionary)).toEqual('fork');
})

it('validateDuplicateAndFork does not show error when passing correct input', () => {
    var dictionary = [
        {range: 'AIK1', domain: 'AIK2'},
    ]
    var newEntry = {range: 'ok1', domain: 'ok2'}
    expect(validateDuplicateAndFork(newEntry, dictionary)).toEqual('noError');
})

it('validateChainAndCycle picks up chain', () => {
    var dictionary = [
        {domain: 'AIK', range: 'AIK'},
    ]
    var newEntry = {domain: 'abcd', range: 'AIK'}
    expect(validateChainAndCycle(newEntry, dictionary)).toEqual('chain');
})

it('validateChainAndCycle picks up cycle', () => {
    var dictionary = [
        {domain: 'DIF', range: 'AIK'},
    ]
    var newEntry = {domain: 'AIK', range: 'DIF'}
    expect(validateChainAndCycle(newEntry, dictionary)).toEqual('cycle');
})

it('validateChainAndCycle does not show error when passing correct input', () => {
    var dictionary = [
        {domain: 'AIK2', range: 'AIK1'},
    ]
    var newEntry = {domain: 'ok2', range: 'ok1'}
    expect(validateChainAndCycle(newEntry, dictionary)).toEqual('noError');
})

it('validateEntry works for duplicate', () => {
    var dictionary = [
        {domain: 'AIK', range: 'DIF'},
    ]
    var newEntry = {domain: 'AIK', range: 'DIF'}

    expect(validateEntry(newEntry, dictionary)).toEqual('duplicate');

})

it('validateEntry works for fork', () => {
    var dictionary = [
        {domain: 'AIK', range: 'AIK'},
    ]
    var newEntry = {domain: 'AIK', range: 'DIF',}
    expect(validateDuplicateAndFork(newEntry, dictionary)).toEqual('fork');
})

it('validateEntry works for chain', () => {
    var dictionary = [
        {domain: 'AIK', range: 'AIK'},
    ]
    var newEntry = {domain: 'abcd', range: 'AIK'}
    expect(validateEntry(newEntry, dictionary)).toEqual('chain');
})

it('validateEntry works for cycle', () => {
    var dictionary = [
        {domain: 'DIF', range: 'AIK'}
    ]
    var newEntry = {domain: 'AIK', range: 'DIF'}
    expect(validateEntry(newEntry, dictionary)).toEqual('cycle');
})

it('validateDictionary returns a validated dictionary and nonProcessable flag == false', () => {
    var dictionary = [
        {domain: 'AIK2', range: 'AIK1'}
    ]
    expect(validateDictionary(dictionary)).toEqual({"nonProcessable": false, "validatedDictionary": [{"domain": "AIK2", "range": "AIK1", "validation": {"code": "noError", "severityColor": "none"}}]});
})

it('validateDictionary returns a validated dictionary and nonProcessable flag == false', () => {
    var dictionary = [
        {domain: 'AIK2', range: 'AIK1'}
    ]
    expect(validateDictionary(dictionary)).toEqual({"nonProcessable": false, "validatedDictionary": [{"domain": "AIK2", "range": "AIK1", "validation": {"code": "noError", "severityColor": "none"}}]});
})

it('validateDictionary returns a validated dictionary and nonProcessable flag == false', () => {
    var dictionary = [
        {domain: 'AIK2', range: 'AIK1'}
    ]
    expect(validateDictionary(dictionary)).toEqual({"nonProcessable": false, "validatedDictionary": [{"domain": "AIK2", "range": "AIK1", "validation": {"code": "noError", "severityColor": "none"}}]});
})

it('validateDictionary returns a validated dictionary and nonProcessable flag == true', () => {
    var dictionary = [
        {domain: 'DIF', range: 'AIK'},
        {domain: 'AIK', range: 'DIF'}
    ]
    expect(validateDictionary(dictionary)).toEqual({"nonProcessable": true, "validatedDictionary": [{"domain": "DIF", "range": "AIK"}, {"domain": "AIK", "range": "DIF", "validation": {"code": "cycle", "severityColor": "red"}}]});
})