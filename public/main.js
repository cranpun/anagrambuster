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
        this.makeTwButton = this.makeTwButton.bind(this);
    }

    buster() {
        this.setState({ inst: false });
        setTimeout(() => {
            // パラメータの取得
            const eText = document.querySelector("#text");
            const vText = encodeURI(eText.value);
            const eShuffle = document.querySelector("#shuffle");
            const vShuffle = encodeURI(eShuffle.value);

            ky.default(`/api/buster?text=${vText}&shuffle=${vShuffle}`).json().then((res) => {
                this.setState(res);
                this.makeTwButton();
                this.setState({ inst: true });
            });
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