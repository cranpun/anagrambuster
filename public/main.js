class AnagramBusterMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anagrams: [
                {
                    anagram: "",
                    remines: []
                }
            ],
            inst: false,
        };

        // This binding is necessary to make `this` work in the callback
        this.buster = this.buster.bind(this);
        this.makeAnagrams = this.makeAnagrams.bind(this);
        this.makeTwButton = this.makeTwButton.bind(this);
    }


    makeAnagrams(head, arr, shuffle) {

        try {
            const skipCap = [
                "っ", "ん", "ゃ", "ゅ", "ょ", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ",
            ];
            if (head.length >= shuffle - 1) {
                // ここでさらに一文字足すのでshuffleは-1
                const ret = [];
                for (let i = 0; i < arr.length; i++) {
                    const remines = arr.concat(); // 複製
                    const char = remines.splice(i, 1)[0];
                    const anagram = head + char;
                    const data = {
                        anagram: anagram,
                        remines: remines,
                    };
                    // console.log(data);
                    ret.push(data);
                }
                return ret;
            } else {
                // 次へ
                let ret = [];
                for (let i = 0; i < arr.length; i++) {
                    // 配列をコピー
                    const next = arr.concat(); // 複製
                    const char = next.splice(i, 1)[0];
                    const text = head + char;
                    if (head.length === 0) {
                        // 先頭にはつかない文字なら飛ばす
                        if (skipCap.includes(char)) {
                            continue;
                        }
                    }
                    const ana = this.makeAnagrams(text, next, shuffle);
                    ret = ret.concat(ana);
                }
                return ret;
            }
        } catch (e) {
            // エラー
            return [];
        }
    };

    buster() {
        this.setState({ inst: false });
        setTimeout(() => {
            // パラメータの取得
            const eText = document.querySelector("#text");
            const eShuffle = document.querySelector("#shuffle");

            const arr = eText.split('');
            if (arr.length === 0) {
                // 文字がないため終了
                return [];
            }
            const ret = this.makeAnagrams("", arr, eShuffle);

            this.setState(ret);
            this.makeTwButton();
            this.setState({ inst: true });
        }, 500);
    }

    makeTwButton() {
        const cssid = "#twbutton";
        // 前の要素は削除
        const wrap = document.querySelector(cssid);
        while (wrap.firstChild) {
            wrap.removeChild(wrap.firstChild);
        }

        const opt = {
            hashtags: "anagrambuster",
            size: "large",
        };
        twttr.widgets.createShareButton(
            location.href,
            document.querySelector(cssid),
            opt);
    }

    render() {
        const trs = [];
        for (let anagram of this.state.anagrams) {
            trs.push(
                <tr>
                    <td>{anagram.anagram} </td>
                    <td>{anagram.remines.join(",")}</td>
                </tr>);
        }

        return (
            <div id="wrap_main">
                <div className="text-center">
                    <input type="text" id="text" defaultValue="anagram"></input>
                    <input type="number" id="shuffle" defaultValue="3"></input>
                    <button type="button" id="buster" onClick={this.buster}>
                        buster!
                    </button>
                </div>

                <ReactTransitionGroup.CSSTransition
                    in={this.state.inst}
                    timeout={{
                        enter: 0,
                        exit: 6000,
                    }}
                    classNames="fade"
                >
                    <div className="fade">
                        <table id="anagrams">
                            <thead>
                                <th>Anagram ({this.state.anagrams.length})</th>
                                <th>Remines</th>
                            </thead>
                            <tbody>
                                {trs}
                            </tbody>
                        </table>

                        <div id="btns" className="flrow">
                            <div className="flitem">
                                <span id="twbutton"></span>
                            </div>
                        </div>
                    </div>
                </ReactTransitionGroup.CSSTransition>
            </div >
        );
    }
}

ReactDOM.render(
    <AnagramBusterMain />,
    document.querySelector('#main_content')
);