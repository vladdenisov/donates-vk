import React from 'react';
import { connect } from 'react-redux';

import { setPage } from "../../store/router/actions";
import { setActiveTab, setScrollPositionByID } from "../../store/vk/actions";
import { restoreScrollPosition } from "../../services/_functions";

import {
    Div,
    Panel,
    Group,
    CellButton,
    PanelHeader,
    FixedLayout,
    HorizontalScroll,
    PanelHeaderBack,
    TabsItem,
    Tabs
} from "@vkontakte/vkui";

class CreateDonateBase extends React.Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDonateBase);
