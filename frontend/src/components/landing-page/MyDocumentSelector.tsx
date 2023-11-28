/* import React, { useState, useEffect } from 'react';
import { backendClient } from "~/api/backend";
import type { SelectOption } from "~/types/selection";

interface MyDocumentSelectorProps {
  myDocuments: SelectOption | null;
  setMyDocuments: (doc: SelectOption | null) => void;
  handleAdd2: () => void;
}

export const MyDocumentSelector: React.FC<MyDocumentSelectorProps> = ({ 
    myDocuments, //or mySelectedDocument
    setMyDocuments,
    handleAdd2
}) => { 
    const [documents, setDocuments] = useState<SelectOption[]>([]);

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const fetchedDocs = await backendClient.fetchDocuments();
                // Assuming the backend returns documents with an id and fullName structure
                const formattedDocs = fetchedDocs.map(doc => ({
                    value: doc.id, 
                    fullName: doc.fullName
                }));
                setDocuments(formattedDocs);                
                //setDocuments(fetchedDocs);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        }

        fetchDocuments();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDoc = documents.find(doc => doc.value === event.target.value);
        if (selectedDoc) {
            setMyDocuments(selectedDoc);
        }
    };

    const handleAddDocumentWithMySelector = () => {
        if (myDocuments) {
          //setSelectedDocuments((prevDocs) => {
            setMyDocuments((prevDocs) => {
            if (prevDocs.find((doc) => doc.id === myDocuments.id)) {
              return prevDocs;
            }
            return [myDocuments, ...prevDocs];
          });
          // Clear the selection after adding
          setMyDocuments(null);
        }
      };

    return (
        <div className="flex-grow">
            <label htmlFor="documentSelector">Select a Document:</label>
            <select 
                id="documentSelector" 
                value={myDocuments?.value || ''} 
                onChange={handleChange}
            >
                {documents.map(doc => (
                    <option key={doc.value} value={doc.value}>
                        {doc.fullName}
                    </option>
                ))}
            </select>
            { <button onClick={handleAdd2}>Add2</button> }
        </div>
    ); 
};
 */

import React, { useState, useEffect } from 'react';
import { backendClient } from "~/api/backend";
import type { SelectOption } from "~/types/selection";

import {
    MAX_NUMBER_OF_SELECTED_DOCUMENTS,
    useDocumentSelector,
  } from "~/hooks/useDocumentSelector";

interface MyDocumentSelectorProps {
  //myDocuments: SelectOption[];
  myDocuments: SelectOption | null;
  //setMyDocuments: (docs: SelectOption[]) => void;
  setMyDocuments: (doc: SelectOption | null) => void;
  //handleAddDocumentWithMySelector: () => void;
  handleAddDocumentWithMySelector?: () => void;
}

export const MyDocumentSelector: React.FC<MyDocumentSelectorProps> = ({ 
    myDocuments,
    setMyDocuments,
    handleAddDocumentWithMySelector
}) => { 
    const [documents, setDocuments] = useState<SelectOption[]>([]);
    //const [selectedDocument, setSelectedDocument] = useState<SelectOption | null>(null);

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const fetchedDocs = await backendClient.fetchDocuments();
                const formattedDocs = fetchedDocs.map(doc => ({
                    value: doc.id, 
                    label: doc.fullName
                }));
                setDocuments(formattedDocs);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        }

        fetchDocuments();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDoc = documents.find(doc => doc.value === event.target.value);
        if (selectedDoc) {
            //setSelectedDocument(selectedDoc);
            setMyDocuments(selectedDoc);
        }
    };
 // THIS FUNCTION CAN'T BE HERE
/*     const handleAddDocumentWithMySelector = () => {
        if (myDocuments) {
          //setSelectedDocuments((prevDocs) => {
            setMyDocuments((prevDocs) => {
            if (prevDocs.find((doc) => doc.id === myDocuments.id)) {
              return prevDocs;
            }
            return [myDocuments, ...prevDocs];
          });
          // Clear the selection after adding
          setMyDocuments(null);
        }
      };  */

/*       const handleAddDocumentWithMySelector = () => {
        if (myDocuments) {
            // Find the actual document using the selected document's value
            const newDoc = availableDocuments.find(doc => doc.id === myDocuments.value);
    
            // Add the new document to the list of selected documents if it's not already there
            setSelectedDocuments(prevDocs => {
                if (prevDocs.find(doc => doc.id === myDocuments.value)) {
                    return prevDocs;
                }
                return newDoc ? [newDoc, ...prevDocs] : prevDocs;
            });
    
            // Clear the current selection
            setMyDocuments(null);
        }
    }; */
    

    return (
        <div className="flex-grow">
            <label htmlFor="documentSelector">Select a Document:</label>
            <select 
                id="documentSelector" 
                //value={selectedDocument?.value || ''} 
                value={myDocuments?.value || ''} 
                onChange={handleChange}
            >
                {documents.map(doc => (
                    <option key={doc.value} value={doc.value}>
                        {doc.label}
                    </option>
                ))}
            </select>
{/*             <MyDocumentSelector
            myDocuments={myDocuments}
            setMyDocuments={setMyDocuments}
            handleAddDocumentWithMySelector={handleAddDocumentWithMySelector}
            />    */}          
            <button onClick={handleAddDocumentWithMySelector}>Add Document</button>
        </div>
    ); 
};
