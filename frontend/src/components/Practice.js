import React, {useState} from 'react';
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage"

const Practice = (props) => {
    const [src, setSrc] = useLocalStorage("src", "")
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)

    return (
      <div>
      <div className="pane-wrapper">
      <div className="pane side-pane">
        <Editor value={src} onChange={setSrc} data={data} setData={setData} setLoading={setLoading}/>
      </div>
    </div>
    <div className="output">
    <iframe     
          srcDoc={loading ? "<div style='color:white;font-size:20px;'>program is executing...</div>" : data.compile_status === undefined ? `<p style="font-size:20px;color:white">${data.output_html === "" ? `<p style="color:red;font-size:20px;">${data.stderr}</p>` : data && data.output_html}</p>` : `<p style="color:red;font-size:20px;">${data.compile_status}</p>`}
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          className="output-data"
        />
    </div>
</div>)
}

export default Practice