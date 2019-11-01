import React from 'react';
import { InformationHeading }  from '../SharedComponents';

export const ValidationInformationText = () => {

    return (<div>
        <InformationHeading>{`Duplicates. Duplicate Domain - Range pairs: Two rows
            in the dictionary map to the same value, simply resulting in duplicate content.`}</InformationHeading>
        <InformationHeading>{`Forks. Duplicate Domains with different Ranges: Two rows in the dictionary map
        to different values, resulting in an ambiguous transformation.`}</InformationHeading>
        <InformationHeading>{`Cycles. Two or more rows in a dictionary result in cycles,
        resulting in a never-ending transformation.`}</InformationHeading>
        <InformationHeading>{`Chains. A chain structure in the dictionary (a value in Range column also appears in Domain
            column of another entry), resulting in
            inconsistent transformation`}</InformationHeading>
    </div>)
}
export default ValidationInformationText;
