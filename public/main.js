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
        // パラメータの取得
        const eText = document.querySelector("#text").value;
        const eShuffle = document.querySelector("#shuffle").value;

        const arr = eText.split('');
        if (arr.length === 0) {
            // 文字がないため終了
            return [];
        }
        const ret = makeAnagrams("", arr, eShuffle);

        this.setState({anagrams: ret});
        this.makeTwButton();
        this.setState({ inst: true });
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
        let i = 0;
        for (let i = 0; i < this.state.anagrams.length; i++) {
            let anagram = this.state.anagrams[i];
            trs.push(
                <tr key={i}>
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
                                <tr>
                                    <th>Anagram ({this.state.anagrams.length})</th>
                                    <th>Remines</th>
                                </tr>
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