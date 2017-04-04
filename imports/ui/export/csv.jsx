import React, { Component, PropTypes } from 'react';

export default class ExportCSV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows : []
        }
        this.exportToCsv = this.exportToCsv.bind(this);
        this.convert_vn_signs = this.convert_vn_signs.bind(this);
    }

    componentDidMount() {
        this.setState({
            rows : this.props.rows
        })

    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            this.setState({
                rows : nextProps.rows
            })
        }
    }


    exportToCsv(event) {
        var that  = this;
        event.preventDefault();
        var rows = [];
        var header = this.props.rowHeader;
        var filename = this.props.fileName;
        rows = this.state.rows;

        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                innerValue = that.convert_vn_signs(innerValue);
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        csvFile = processRow(header);
        for (var i = 0; i < rows.length; i++) {

            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    convert_vn_signs(txt) {
        txt = txt.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        txt = txt.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        txt = txt.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        txt = txt.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        txt = txt.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        txt = txt.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        txt = txt.replace(/(đ)/g, 'd');
        txt = txt.replace(/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g, 'A');
        txt = txt.replace(/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g, 'E');
        txt = txt.replace(/(Ì|Í|Ị|Ỉ|Ĩ)/g, 'I');
        txt = txt.replace(/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g, 'O');
        txt = txt.replace(/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g, 'U');
        txt = txt.replace(/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g, 'Y');
        txt = txt.replace(/(Đ)/g, 'D');
        return txt;
    }

    render() {
        return (
            <a  href="#" onClick={this.exportToCsv}>
                <i className="fa fa-download" aria-hidden="true"></i>
            </a>

        );
    }

}
