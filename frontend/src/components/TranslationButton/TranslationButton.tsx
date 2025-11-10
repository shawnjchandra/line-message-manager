import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import './TranslationButton.scss';


function TranslationButton(){
    const { t, i18n } = useTranslation();
    const [currLanguange, setCurrLanguage] = useState<string>(i18n.language);
    
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setCurrLanguage(lng);
    }

    return <>
        <Button
            className="translation-button"
            onClick={()=>{
                currLanguange.match('id') ? 
                changeLanguage('en') :
                changeLanguage('id')
            }}
        >
            {currLanguange.toUpperCase()}
        </Button>
    </>
}

export default TranslationButton;