import { Injectable } from "@angular/core";

@Injectable()
export class StringUtil {

    public convertoUnsignKeepSpace(text: string): string {
        if (typeof (text) !== "string") {
            return "";
        }
        let i = 0, n = text.length, rs = "";
        for (i = 0; i < n; i++) {
            if (text[i] === " ") {
                rs += " ";
            } else if (StringUtil.UNSIGN_CHAR_MAP.hasOwnProperty(text[i])) {
                rs += StringUtil.UNSIGN_CHAR_MAP[text[i]];
            } else {
                rs += text[i];
            }
        }
        return rs;
    }

    convertoUnsign(text) {
        if (text == undefined || text == null || typeof (text) !== "string") {
            return "";
        }
        var i = 0, n = text.length, rs = "";
        for (var i = 0; i < n; i++) {
            if (StringUtil.UNSIGN_CHAR_MAP.hasOwnProperty(text[i])) {
                rs += StringUtil.UNSIGN_CHAR_MAP[text[i]];
            } else {
                rs += text[i];
            }
        }
        return rs;
    }

    static UNSIGN_CHAR_MAP: Object = {
        "Á": "A",
        "À": "A",
        "Ả": "A",
        "Ã": "A",
        "Ạ": "A",
        "Ă": "A",
        "Ắ": "A",
        "Ằ": "A",
        "Ẳ": "A",
        "Ẵ": "A",
        "Ặ": "A",
        "Â": "A",
        "Ấ": "A",
        "Ầ": "A",
        "Ẩ": "A",
        "Ẫ": "A",
        "Ậ": "A",
        "á": "a",
        "à": "a",
        "ả": "a",
        "ã": "a",
        "ạ": "a",
        "ă": "a",
        "ắ": "a",
        "ằ": "a",
        "ẳ": "a",
        "ẵ": "a",
        "ặ": "a",
        "â": "a",
        "ấ": "a",
        "ầ": "a",
        "ẩ": "a",
        "ẫ": "a",
        "ậ": "a",
        "Đ": "D",
        "đ": "d",
        "É": "E",
        "È": "E",
        "Ẻ": "E",
        "Ẽ": "E",
        "Ẹ": "E",
        "Ê": "E",
        "Ế": "E",
        "Ề": "E",
        "Ể": "E",
        "Ễ": "E",
        "Ệ": "E",
        "é": "e",
        "è": "e",
        "ẻ": "e",
        "ẽ": "e",
        "ẹ": "e",
        "ê": "e",
        "ế": "e",
        "ề": "e",
        "ể": "e",
        "ễ": "e",
        "ệ": "e",
        "Í": "I",
        "Ì": "I",
        "Ỉ": "I",
        "Ĩ": "I",
        "Ị": "I",
        "í": "i",
        "ì": "i",
        "ĩ": "i",
        "ị": "i",
        "Ó": "O",
        "Ò": "O",
        "Ỏ": "O",
        "Õ": "O",
        "Ọ": "O",
        "Ô": "O",
        "Ố": "O",
        "Ồ": "O",
        "Ổ": "O",
        "Ỗ": "O",
        "Ộ": "O",
        "Ơ": "O",
        "Ớ": "O",
        "Ờ": "O",
        "Ở": "O",
        "Ỡ": "O",
        "Ợ": "O",
        "ó": "o",
        "ò": "o",
        "ỏ": "o",
        "õ": "o",
        "ọ": "o",
        "ô": "o",
        "ố": "o",
        "ồ": "o",
        "ổ": "o",
        "ỗ": "o",
        "ộ": "o",
        "ơ": "o",
        "ớ": "o",
        "ờ": "o",
        "ở": "o",
        "ỡ": "o",
        "ợ": "o",
        "Ú": "U",
        "Ù": "U",
        "Ủ": "U",
        "Ũ": "U",
        "Ụ": "U",
        "Ư": "U",
        "Ứ": "U",
        "Ừ": "U",
        "Ử": "U",
        "Ữ": "U",
        "Ự": "U",
        "ú": "u",
        "ù": "u",
        "ủ": "u",
        "ũ": "u",
        "ụ": "u",
        "ư": "u",
        "ứ": "u",
        "ừ": "u",
        "ử": "u",
        "ữ": "u",
        "ự": "u",
        "Ý": "Y",
        "Ỳ": "Y",
        "Ỷ": "Y",
        "Ỹ": "Y",
        "Ỵ": "Y",
        "ý": "y",
        "ỳ": "y",
        "ỷ": "y",
        "ỹ": "y",
        "ỵ": "y",

        " ": "-",
        "\t": "-",
        "<": "-",
        ">": "-",
        "*": "-",
        "%": "-",
        "&": "-",
        ":": "-",
        "\\": "-",
        "/": "-"
    }

    public convertTime(seconds: number, hasUnit: boolean = false): string {
        if (seconds < 60) {
            if (seconds < 10) {
                return hasUnit ? "00 min 0" + seconds + " s" : "00:0" + seconds;
            }
            return hasUnit ? "00 min " + seconds + " s" : "00:" + seconds;
        }
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        let s = "";
        if (min < 60) {
            if (min < 10) {
                s += "0" + min + (hasUnit ? " min " : ":");
            } else {
                s += min + (hasUnit ? " min " : ":");
            }
            if (sec < 10) {
                s += "0" + sec + (hasUnit ? " s" : "");
            } else {
                s += sec + (hasUnit ? " s" : "");
            }
            return s;
        }
        let h = Math.floor(min / 60);
        min = min % 60;
        s = h + (hasUnit ? " h " : ":");
        if (min < 10) {
            s += "0" + min + (hasUnit ? " min " : ":");
        } else {
            s += min + (hasUnit ? " min " : ":");
        }
        if (sec < 10) {
            s += "0" + sec + (hasUnit ? " sec" : "");
        } else {
            s += sec + (hasUnit ? " sec" : "");
        }
        return s;
    }

    public toUTF8Array(str: string): Array<number> {
        var utf8 = [];
        for (var i = 0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6),
                    0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                    | (str.charCodeAt(i) & 0x3ff))
                utf8.push(0xf0 | (charcode >> 18),
                    0x80 | ((charcode >> 12) & 0x3f),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    }

    public fromUTF8Array(data: Array<number>): string { // array of bytes
        var str = "",
            i;

        for (i = 0; i < data.length; i++) {
            var value = data[i];

            if (value < 0x80) {
                str += String.fromCharCode(value);
            } else if (value > 0xBF && value < 0xE0) {
                str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
                i += 1;
            } else if (value > 0xDF && value < 0xF0) {
                str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
                i += 2;
            } else {
                // surrogate pair
                var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;

                str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
                i += 3;
            }
        }

        return str;
    }

    public checkChineseCharacter(str: string): boolean {
        if (!str) {
            return false;
        }
        let regexChineseChar = new RegExp("^[\u4E00-\uFA29]*$");
        let regexNonChineseChar = new RegExp("^[\uE7C7-\uE7F3]*$");
        str = str.replace(/\s/g, '');

        if (!regexChineseChar.test(str) || regexNonChineseChar.test(str)) {
            return false;
        }
        return true;
    }
}