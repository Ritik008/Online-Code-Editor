import React, {useEffect, useState} from "react"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "codemirror/theme/monokai.css"
import "codemirror/theme/idea.css"
import "codemirror/theme/dracula.css"
import "codemirror/theme/eclipse.css"
import "codemirror/theme/moxer.css"
import "codemirror/theme/xq-light.css"
import "codemirror/theme/isotope.css"
import "codemirror/theme/panda-syntax.css"
import "codemirror/theme/rubyblue.css"
import "codemirror/theme/icecoder.css"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/python/python"
import "codemirror/mode/clike/clike"
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/keymap/sublime';
import "codemirror/addon/edit/closebrackets"
import C from "../boilerplate-code/C";
import Cpp from "../boilerplate-code/Cpp"
import Csharp from "../boilerplate-code/Csharp"
import Java from "../boilerplate-code/Java"
import Python from "../boilerplate-code/Python"
import Javascript from "../boilerplate-code/Javascript"
import {Controlled as ControlledEditor} from "react-codemirror2"
import useLocalStorage from "../hooks/useLocalStorage"

const Editor = (props) => {
    
    const [theme, setTheme] = useLocalStorage("theme","material")
    const [language, setLanguage] = useLocalStorage("language","text/x-csrc")
    const [size, setSize] = useLocalStorage("size",12)
    const [input, setInput] = useLocalStorage("input",null)
    const [lang, setLang] = useLocalStorage("lang", "C")

    const[id, setId] = useState("")
    const [image, setImage] = useState("")
    const[name, setName] = useState("")
    const[emailName, setEmailName] = useState("")
    const[savedCode, setSavedCode] = useState([])
    const localName = localStorage.getItem("user")
    

    const {value, onChange, data, setData, setLoading} = props
    
    useEffect(()=> {
        const jsonValue = localStorage.getItem("code-editor-src")
        if(!jsonValue) {
            onChange(C)
        }
        setId(localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")).id: "")
        setImage(localStorage.getItem("profile"))
        setName(localStorage.getItem("username"))
        setEmailName(localName !== null ? JSON.parse(localStorage.getItem("user")).username: "")
        
    }, [])

    const handleChange = (editor, data, value) => {
        onChange(value)
    }

    const uploadCode = async ()=> {
        
        await fetch("/user/upload", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                localUser: localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).id,
                googleUser: localStorage.getItem("googleId"),
                code: value
            })
        })
        
        const res = await fetch(`/user/code/${id}`)
        const data = await res.json()
        setSavedCode(data)
    }

    const codeSelectHandler = (e)=> {
        onChange(e.target.value)
    }
    
    const themeHandler = (e) => {
        setTheme(e.target.value)
    }

    const inputChangeHandler = (e) => { 
        setInput(e.target.value)
    }

    const testHandler = async (e) => {
        window.scrollTo({
            top: 300,
            behavior:"smooth",
        })
        setLoading(true)
        const res = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                source: value,
                lang: lang,
                input: input,
            })
        })
        const data = await res.json()
        if(data.data.compile_status !== "OK") {
           setData(data.data)
           setLoading(false)
        }else {
            setData(data.data.run_status)
            setLoading(false)
        }
    }

    const languageHandler = (e) => {
        const lang = e.target.value.split(" ")

        setLang(lang[0])
        setLanguage(lang[1])
        if(lang[1] === 'text/x-csrc') {
            onChange(C)
        }else if(lang[1] === "text/x-c++src") {
            onChange(Cpp)
        }else if(lang[1] === "text/x-csharp") {
            onChange(Csharp)
        }else if(lang[1] === "text/x-java") {
            onChange(Java)
        }else if(lang[1] === "python") {
            onChange(Python)
        }else if(lang[1] === "javascript") {
            onChange(Javascript)
        }
    }

    const sizeHandler = (e) => {
        setSize(e.target.value)
    }

    return (
        <div className="editor-container">
            <div className="editor-title">
                <div className="title">Code Editor</div> 
            <div className="widgets">  

            <i className="fa fa-file-code" data-toggle="modal" data-target="#savedFile" style={{"font-size":"20px"}} title="theme"></i>
                    <div id="savedFile" className="modal fade" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                        <div className="modal-header">
                        <h4 className="modal-title ml-3 mt-3">Saved Files</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                        {savedCode.code ? <select onChange={codeSelectHandler} className="codes">
                        {savedCode.code.map((data, index)=>(<option value={data.code} key={index}>Code_{index}</option>))}
                        </select> : <select className="codes"><option>No Code is Saved Yet</option></select>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                        </div>

                    </div>
                    </div>

            {(name||emailName) ? <i className="fa fa-cloud" onClick={uploadCode} aria-hidden="true" title="save"></i> : <i className="fa fa-cloud" onClick={uploadCode} disabled={true} title="login to save data"></i>}          
                
            <i className="fa fa-fire" data-toggle="modal" data-target="#theme" style={{"font-size":"20px"}} title="theme"></i>

                <div id="theme" className="modal fade" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title ml-3 mt-3">Theme</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                    <select onChange={themeHandler} className="theme">
                        <option value="material" selected={theme === "material" ? true: false}>Material</option>
                        <option value="eclipse" selected={theme === "eclipse" ? true: false}>Eclipse</option>
                        <option value="monokai" selected={theme === "monokai" ? true: false}>Monokai</option>
                        <option value="dracula" selected={theme === "dracula" ? true: false}>Dracula</option>
                        <option value="idea" selected={theme === "idea" ? true: false}>Idea</option>
                        <option value="moxer" selected={theme === "moxer" ? true: false}>Moxer</option>
                        <option value="panda-syntax" selected={theme === "panda-syntax" ? true: false}>Panda</option>
                        <option value="xq-light" selected={theme === "xq-light" ? true: false}>xq-light</option>
                        <option value="isotope" selected={theme === "isotope" ? true: false}>Isotope</option>
                        <option value="rubyblue" selected={theme === "rubyblue" ? true: false}>Rubyblue</option>
                        <option value="icecoder" selected={theme === "icecoder" ? true: false}>Icecoder</option>
                    </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    </div>

                </div>
                </div>

                <i className="fa fa-code" data-toggle="modal" data-target="#myModal" style={{"font-size":"20px"}} title="language"></i>

                <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title ml-3 mt-3">Choose Language</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                    <select onChange={languageHandler} className="language">
                        <option value="C text/x-csrc" selected={lang === "C" ? true : false}>C</option>
                        <option value="CPP text/x-c++src" selected={lang === "CPP" ? true : false}>C++</option>
                        <option value="CSHARP text/x-csharp" selected={lang === "CSHARP" ? true : false}>C#</option>
                        <option value="JAVA text/x-java" selected={lang === "JAVA" ? true: false}>Java</option>
                        <option value="PYTHON python" selected={lang === "PYTHON" ? true: false}>Python</option>
                        <option value="JAVASCRIPT_NODE javascript" selected={lang === "JAVASCRIPT_NODE" ? true: false}>Javascript(Nodejs)</option>
                </select>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    </div>

                </div>
                </div>

                <i className="fa fa-font" data-toggle="modal" data-target="#textSize" style={{"font-size":"20px"}} title="font"></i>

                <div id="textSize" className="modal fade" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title ml-3 mt-3">Text Size</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                    <select onChange={sizeHandler} className="textSize">
                    <option value="s11px" selected={size === "s11px" ? true: false}>11px</option>
                    <option value="s12px" selected={size === "s12px" ? true: false}>12px</option>
                    <option value="s13px" selected={size === "s13px" ? true: false}>13px</option>
                    <option value="s14px" selected={size === "s14px" ? true: false}>14px</option>
                    <option value="m15px" selected={size === "m15px" ? true: false}>15px</option>
                    <option value="m16px" selected={size === "m16px" ? true: false}>16px</option>
                    <option value="l17px" selected={size === "l17px" ? true: false}>17px</option>
                    <option value="l18px" selected={size === "l18px" ? true: false}>18px</option>
                    </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className={`code-mirror-wrapper ${(size === "s11px" && "s11px") || (size === "s12px" && "s12px") || (size === "s13px" && "s13px")|| (size === "s14px" && "s14px") || (size === "m15px" && "m15px")|| (size === "m16px" && "m16px")|| (size === "l17px" && "l17px")|| (size === "l18px" && "l18px")}`}
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: theme,
                    lineNumbers: true,
                    matchBrackets:true,
                    keyMap: 'sublime',
                    autoCloseBrackets: true,
                    smartIndent: true,
                    tabSize: 4,
                    indentWithTabs: false,
                    
                }}
            />

            <div className="footer">
                <div className="custom-input">    
                    <button className="btn custom-input" data-toggle="modal" data-target="#customInput">Custom Input</button>
                        <div id="customInput" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                            <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Custom Input</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                        <textarea onChange={inputChangeHandler}
                         className="form-control custom-input" style={{"minWidth": "100%", "height": "18rem"}}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <button className="btn test-btn" onClick={testHandler}>Run</button>
            </div>
        </div>
    )
}

export default Editor