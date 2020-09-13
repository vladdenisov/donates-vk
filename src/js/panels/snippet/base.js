import React from 'react';
import { connect } from 'react-redux';

import { closePopout, goBack, openModal, openPopout, setPage, setStory } from '../../store/router/actions';

import { Div, Panel, Card, Group, Button, PanelHeader, Separator, Progress, Text } from "@vkontakte/vkui"

class SnippetBase extends React.Component {

    state = {
        count: 0
    };
    getDate = () => {
        if (this.props.data.type === 1) return " · Помощь нужна каждый месяц"
        if (this.props.data.mode === 1) return ''
        let date = new Date(this.props.data.date).getTime()
        let now = new Date().getTime()
        let remain = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
        let last = remain % 10
        if (last === 1) return ` · Осталось ${remain} день`
        if ([2, 3, 4].includes(last)) return ` · Осталось ${remain} дня`
        else return ` · Осталось ${remain} д`

    }
    showImg = () => {
        this.setState({ showImg: true });
    };
    componentWillMount() {
        if (!this.props.data.name) this.props.data.name = 'Добряши помогают котикам'
        if (!this.props.data.author) this.props.data.author = 'Матвей Правосудов'
        if (!this.props.data.date) this.props.data.date = 'Wed Sep 30 2020 22:35:28 GMT+0300 (Moscow Standard Time)'
        if (!this.props.data.money) this.props.data.money = '10000'
        if (!this.props.data.img) this.props.data.img = 'https://townsquare.media/site/508/files/2013/10/Kitten-in-Cage-CreditiStockphoto-45160735-e1382203423837.jpg?w=980&q=75'
        console.log(this.props.data)

    }
    componentDidMount() {
        document.getElementsByClassName('snippet-image')[0].style.backgroundImage = `url(${this.props.data.img})`
    }
    render() {
        const { id, setPage, withoutEpic } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Пожертвования</PanelHeader>
                <Group className='center'>
                    <Div className="centered">
                        <Card className="snippet-main">
                            <div className='snippet-image'></div>
                            <div className='snippet-info'>
                                <span className='snippet-title'>{this.props.data.name}</span>
                                <div className='snippet-info-bottom'><span>{this.props.data.author}</span><span>{this.getDate()}</span></div>
                            </div>
                            <Separator />
                            <div className="snippet-bottom">
                                <div className="snippet-progress">
                                    <Text weight="regular" className='snippet-progress--text'>{this.state.count === 0 ? "Помогите первым" : `Собрано ${Math.round(this.props.data.money / 100 * this.state.count)} ₽ из ${this.props.data.money} ₽`}</Text>
                                    <Progress className="progressbar" value={this.state.count} />
                                </div>
                                <Button mode="outline" onClick={() => {
                                    if (this.state.count === 100) return
                                    this.setState({ count: this.state.count + 5 })
                                    document.getElementsByClassName('Progress__in')[0].style.width = this.state.count + "%"
                                }}>Помочь</Button>
                            </div>
                        </Card>
                    </Div>
                </Group>
            </Panel >
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(SnippetBase);
