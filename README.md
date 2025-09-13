# Sprint 1: TypeScript CSV

## TASK B

- ### Step 1: List 4 Issues
    - From testing, I found the CSV Parser was unable to parse quotes and strings containing commas. For functionailty purposes, 
    recognizing a title column could help sort confusion. From the caller's perspective, I think the ability to use different dilimiters would be beneficial to making the CSV Parser expandable. To summarize the four issues: Parsing double quotes, parsing strings containing commas, ability to recognize title vs data, and ability to have dilimiter variations. 

- ### Step 2: List 4 Issues per LLM
    - 4 Issues from LLM: Multiline fields, Null/NA handling, Quoting rules, delimiter and dialects

- ### Step 3: Propose Enhancements
    Multiline Fields in Cell
        - Category: Functionality
        - From LLM
        - User Story: As a user, I can parse CSV files where certain fields may span multiple lines, and the data retrieved reflects this. 
        - Acceptance Criteria:
            - CSV parser may look for \n to indicate a line break
            - Columns may remain unaffected with the line breaks

    Parsing Double Quotes
        - Category: Functionality
        - From LLM and myself
        - User Story: As a user, I can parse through fields that include double quoted strings and/or numbers so potentially dialogue or naming purposes.  
        - Acceptance Criteria:
            - CSV parser should return a double quoted field as typed in the CSV file
            - Create errors in case of inccorect quotation marks

    Different Delimiters
        - Category: Extensibility
        - From LLM and myself
        - User Story: As a user, I can choose different delimiter options such as commas, semicolons, specific number of spaces. This allows for extensions to different CSV files.   
        - Acceptance Criteria:
            - CSV parser can automatically identify the delimiter
            - Delimiter used does not cause errors with subjects of rows

    Strings Containing Commas
        - Category: Functionality
        - From myself
        - User Story: As a user, I can parse through fields that contain commas, such as locations or full names.
        - Acceptance Criteria:
            - Quote specific instances of this in the CSV file
            - Rows that contain unquoted delimiters can throw errors

    Notes about LLM (see steps 1 and 2 for other notes): When prompting the LLM, I changed the prompt to ask for tips for extensibility and for functionality. For extensibility, the answer focused around different plugins and adapters that allow for the parser to be used for more than a CSV. Meanwhile for functionality, most of the suggested changes were from the original prompt, such as delimiters, multiline fields, and double quotes. 

### Design Choices
    - My goal was to keep the parser minimal and flexible, The parser reads from a CSV file and turns raw rows into string [][] arrays, and will apply a Zod schema transformation if the row is validated. Validation errors are also thrown if there are issues with validation. Finally, type casting was avoided, leaving type coercion to the schema called by the user. 

### 1340 Supplement

- #### 1. Correctness
    - Properties to Check & Test:
        - Preserves row structure of CSV file
        - Header handling for title rows
        - Correct delimiter handling
        - Double Quote pairing for dialogue 
        - Schema validation (if included)
        - Successfully handles empty cells/columns

- #### 2. Random, On-Demand Generation
    - The random on-demand generation could be utilized for testing the specific properties listed above. Creating random tables with quotes, embedded delimiters, and line breaks can help test the basic functionality of the parser. Also, the random data could help test the use of the Zod schema. If the function can produce scheme-valid rows, the developer can also test the schema parameter. And as a function with the ability to mass produce CSV data, the scale of testing can be increased dramatically, making testing more efficient and effective. 

- #### 3. Overall experience, Bugs encountered and resolved
    - This sprint was different from some other programming assignments in a couple different ways. First, we were given dysfunctional starter code for the CSV parser, which forced us to brainstorm enhancements. On the same topic, a large emphasis was on the detailed enhancements, but not necessarily the implementation of the ideas. Other than a few silly programming mistakes, my implementation did not encounter any major bugs. By using simplified coding practices, I made sure to stay within the scope of what I knew, largely avoiding any issues.  

#### Errors/Bugs: N/a
#### Tests: 
    - parseCSV yields arrays
    - parseCSV yields only arrays
    - parseCSV w/ Apostrophes and Decimal
    - parseCSV w/ Locations and Commas
    - parseCSV w/ Empty Column
    - parseCSV w/ Double Quotes
    - parseCSV w/ schema (validates & transforms rows)
    - parseCSV throws on failure
    - parseCSV with product schema
#### How To…: npm run and npm test (for testing file)

#### Team members and contributions (include cs logins): n/a

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): 
    - Used ChatGPT to brainstorm ideas for a schema other than the person row schema we were given in class
#### Total estimated time it took to complete project: 10 Hours
#### Link to GitHub Repo: https://github.com/grifffinptaylor 
