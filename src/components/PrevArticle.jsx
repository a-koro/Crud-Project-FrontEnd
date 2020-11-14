import React, {useState} from 'react';

export default function PrevArticle(props) {
    const [dateTime, setDateTime] = useState(new Date());

    function convertDateTime() {
        let timeStamp = props.articleId.toString().substring(0, 8);
        setDateTime(new Date(parseInt(timeStamp, 16) * 1000));
    }

    React.useEffect(() => {
        convertDateTime();
    }, []);

    return (
        <div class="card p-1 mt-2">
            <div class="mb-0 card-body">
                <h3 className="mb-4">{props.title}</h3>
                <div>
                    <span className="float-left">{props.firstName + " " + props.lastName}</span>
                    <span className="float-right">{dateTime.toLocaleTimeString("en-UK") + " " + dateTime.toLocaleDateString("en-UK")}</span>
                </div>
            </div>
        </div>
    );
}