import React from 'react';
import { connect } from 'react-redux';

import { setPage, setStory } from "../../store/router/actions";
import { setActiveTab, setScrollPositionByID } from "../../store/vk/actions";
import { restoreScrollPosition } from "../../services/_functions";
import { Icon28TargetOutline, Icon28CalendarOutline, Icon28ChevronRightOutline } from '@vkontakte/icons'

import {
    Div,
    Panel,
    Group,
    CellButton,
    CardGrid,
    Card,
    PanelHeader,
    FixedLayout,
    PanelHeaderBack,
    HorizontalScroll,
    TabsItem,
    Tabs,
    Button
} from "@vkontakte/vkui";

class CreateDonateType extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: props.activeTab["EXAMPLE"] || "modal"
        };
    }

    setTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    // componentWillUnmount() {
    //     const { setScrollPositionByID, setActiveTab } = this.props;

    //     setActiveTab("EXAMPLE", this.state.activeTab);
    //     setScrollPositionByID("EXAMPLE_TABS_LIST");
    // }

    // componentDidMount() {
    //     restoreScrollPosition();
    // }

    render() {
        const { id, setPage } = this.props;
        const boxStyle = { marginTop: 56 };

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.onBackClick} />} >Тип сбора</PanelHeader>
                <Group className="center-group">
                    <Div className="centered column">
                        <CardGrid className="CardGrid">
                            <Card size="l" className='Card' >
                                <div style={{ height: 70 }} onClick={() => {
                                    this.props.data.type = 0
                                    console.log(this.props)
                                    this.props.setState(this.props.data, this.props.data)
                                    setPage('create-donate', 'data')
                                }}
                                    className="card-inner">
                                    <div className="card-inner--left"><Icon28TargetOutline /></div>
                                    <div className="card-inner--text">Целевой <br /> <span>Когда есть определенная цель</span></div>
                                    <div className="card-inner--right"><Icon28ChevronRightOutline /></div>
                                </div>
                            </Card>
                            <Card size="l" className='Card' >
                                <div style={{ height: 70 }} onClick={() => {
                                    this.props.data.type = 1
                                    console.log(this.props)
                                    this.props.setState(this.props.data, this.props.data)
                                    setPage('create-donate', 'data')
                                }}
                                    className="card-inner">
                                    <div className="card-inner--left"><Icon28CalendarOutline /></div>
                                    <div className="card-inner--text">Регулярный <br /> <span>Если помощь нужна ежемесячно</span></div>
                                    <div className="card-inner--right"><Icon28ChevronRightOutline /></div>
                                </div>
                            </Card>
                        </CardGrid>
                    </Div>
                </Group>
            </Panel>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        activeTab: state.vkui.activeTab,
    };
};

const mapDispatchToProps = {
    setPage,
    setActiveTab,
    setScrollPositionByID
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDonateType);
