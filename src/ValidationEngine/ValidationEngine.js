import produce from "immer";

export const severityColorMap = {
    'noError': 'none',
    'duplicate': 'black',
    'fork': 'black',
    'chain': 'darkkhaki',
    'cycle': 'red'
}

export const nonProcessableMap = {
    'noError': false,
    'duplicate': false,
    'fork': false,
    'chain': false,
    'cycle': true
}

const addValidationToDictionary = produce((dictionary, index, validation) => {
    dictionary[index].validation = validation
});

export const validateDictionary = (dictionary) => {

    var validatedDictionary = [];
    let nonProcessable = false;

    dictionary.forEach((element, index, array) => {
        if (index > 0) {
            var newArray = array.slice(0, index);
            var validation;
            validation = validateEntry(element, newArray);
            if (nonProcessableMap[validation]) {
                nonProcessable = true;
            }
            validation = {code: validation, severityColor: severityColorMap[validation]};
            validatedDictionary = addValidationToDictionary(validatedDictionary, index, validation);
        }
        else {
            validation = {code: 'noError', severityColor: severityColorMap['noError']};
            validatedDictionary = addValidationToDictionary(dictionary, index, validation);
        }
    })

    return {validatedDictionary: validatedDictionary, nonProcessable: nonProcessable};

}

export const validateDuplicateAndFork = (newEntry, dictionary) => {

    const dictionaryWithDomain = dictionary.map((obj) => obj.domain);
    const dictionaryWithRange = dictionary.map((obj) => obj.range);
    const dictionaryRangeIndex = dictionaryWithRange.findIndex((range) => range.toUpperCase() === newEntry.range.toUpperCase());
    const dictionaryRangeDomain = dictionaryWithDomain.findIndex((domain) => domain.toUpperCase() === newEntry.domain.toUpperCase());

    if (dictionaryRangeIndex === dictionaryRangeDomain && dictionaryRangeIndex !== -1) {
        return "duplicate";
    }
    else if ((dictionaryRangeDomain !== -1) && (dictionaryRangeIndex !== dictionaryRangeDomain)) {
        return "fork";
    }
    else {
        return "noError"
    }
}

export const validateChainAndCycle = (newEntry, dictionary) => {
    const dictionaryWithDomain = dictionary.map((obj) => obj.domain);
    const dictionaryWithRange = dictionary.map((obj) => obj.range);
    const dictionaryRangeIndex = dictionaryWithRange.findIndex((range) => range.toUpperCase() === newEntry.domain.toUpperCase());
    const dictionaryRangeDomainIndex = dictionaryWithDomain.findIndex((domain) => domain.toUpperCase() === newEntry.range.toUpperCase());

    if (dictionaryRangeIndex !== -1 && dictionaryRangeIndex === dictionaryRangeDomainIndex) {
        return "cycle";
    }
    if (dictionaryRangeIndex !== -1 || dictionaryRangeDomainIndex !== -1) {
        return "chain";

    }
    else {
        return "noError"
    }
}

export const validateEntry = (entry, dictionary) => {
    const validateCAC = validateChainAndCycle({
        "domain": entry.domain,
        "range": entry.range
    }, dictionary);

    const validateDAF = validateDuplicateAndFork({
        "domain": entry.domain,
        "range": entry.range
    }, dictionary);

    if (validateCAC === "cycle") {
        return 'cycle'
    }
    else if (validateCAC === "chain") {
        return 'chain'
    }
    else if (validateDAF === "fork") {
        return 'fork'

    }
    else if (validateDAF === "duplicate") {
        return 'duplicate'
    }
    else {
        return 'noError'
    }
}