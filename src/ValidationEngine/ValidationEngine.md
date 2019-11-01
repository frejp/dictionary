## Doc for this module

The Validation validates a dictionary upon calling the validateDictionary function.
The validation is checks if the dictionary is consistent.
For a dictionary to be consistent if none of the following problems occur.

1. Duplicates. Duplicate Domain - Range pairs: Two rows in the dictionary map to the same value, simply resulting in duplicate content

2.A dictionary is said to be consistent if none of the following problems occurs:
Duplicates. Duplicate Domain - Range pairs: Two rows in the dictionary map to the same value, simply resulting in duplicate content

3.Cycles. Two or more rows in a dictionary result in cycles, resulting in a never-ending transformation.

4.Chains. A chain structure in the dictionary (a value in Range column also appears in Domain column of another entry), resulting in
inconsistent transformation.