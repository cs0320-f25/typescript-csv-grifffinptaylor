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

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
