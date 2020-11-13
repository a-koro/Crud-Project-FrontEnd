import React from 'react';

export default function Error(props) {
    return (
        <div class="card">
            <div class="card-body bg-warning p-1">
                {props.message}
                <button className="btn float-right" onClick={props.clearError}>X</button>
            </div>
        </div>
    );
}