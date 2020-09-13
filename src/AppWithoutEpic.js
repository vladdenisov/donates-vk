import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { goBack, closeModal } from "./js/store/router/actions";
import { getActivePanel } from "./js/services/_functions";
import * as VK from './js/services/VK';

import { View, Root, ModalRoot, ConfigProvider } from "@vkontakte/vkui";

import HomePanelProfile from './js/panels/home/base';
import HomePanelGroups from './js/panels/home/groups';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';


import CreateDonatePanelBase from './js/panels/create-donate/base'
import CreateDonateType from './js/panels/create-donate/select-type'
import CreateDonateData from './js/panels/create-donate/enter-data'
import CreateDonateMoreData from './js/panels/create-donate/more-data'

import SnippetBase from './js/panels/snippet/base'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.changeData = this.changeData.bind(this);
        this.state = { data: {} }
        this.lastAndroidBackAction = 0;
    }

    componentWillMount() {
        const { goBack, dispatch } = this.props;

        dispatch(VK.initApp());

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack();
            } else {
                window.history.pushState(null, null);
            }
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { activeView, activeStory, activePanel, scrollPosition } = this.props;

        if (
            prevProps.activeView !== activeView ||
            prevProps.activePanel !== activePanel ||
            prevProps.activeStory !== activeStory
        ) {
            let pageScrollPosition = scrollPosition[activeStory + "_" + activeView + "_" + activePanel] || 0;

            window.scroll(0, pageScrollPosition);
        }
    }
    changeData(e, data) {
        this.setState({ ...this.state, data: data })
    }
    render() {
        const { goBack, closeModal, popouts, activeView, activeModals, panelsHistory, colorScheme } = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];
        let popout = (popouts[activeView] === undefined) ? null : popouts[activeView];
        let activeModal = (activeModals[activeView] === undefined) ? null : activeModals[activeView];

        const homeModals = (
            <ModalRoot activeModal={activeModal}>
                <HomeBotsListModal
                    id="MODAL_PAGE_BOTS_LIST"
                    onClose={() => closeModal()}
                />
                <HomeBotInfoModal
                    id="MODAL_PAGE_BOT_INFO"
                    onClose={() => closeModal()}
                />
            </ModalRoot>
        );

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                <Root activeView={activeView} popout={popout}>
                    <View
                        id="home"
                        modal={homeModals}
                        activePanel={getActivePanel("home")}
                        history={history}
                        onSwipeBack={() => goBack()}
                    >
                        <HomePanelProfile id="base" withoutEpic={true} />
                        <HomePanelGroups id="groups" />
                    </View>
                    <View
                        id="modal"
                        modal={homeModals}
                        activePanel={getActivePanel("modal")}
                        history={history}
                        onSwipeBack={() => goBack()}
                    >
                    </View>
                    <View id="create-donate"
                        onSwipeBack={() => goBack()}
                        onBackClick={() => goBack()}
                        activePanel={getActivePanel("base")}
                        history={history}
                    >
                        <CreateDonatePanelBase id="base" onBackClick={() => goBack()} setState={this.changeData} data={this.state.data} />
                        <CreateDonateType id="type" onBackClick={() => goBack()} setState={this.changeData} data={this.state.data} />
                        <CreateDonateData id="data" onBackClick={() => goBack()} setState={this.changeData} data={this.state.data} />
                        <CreateDonateMoreData id="more" onBackClick={() => goBack()} setState={this.changeData} data={this.state.data} />
                    </View>
                    <View id="snippet"
                        onSwipeBack={() => goBack()}
                        onBackClick={() => goBack()}
                        activePanel={getActivePanel("base")}
                        history={history}
                    >
                        <SnippetBase id="base" onBackClick={() => goBack()} setState={this.changeData} data={this.state.data} />
                    </View>

                </Root>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeView: state.router.activeView,
        activeStory: state.router.activeStory,
        panelsHistory: state.router.panelsHistory,
        activeModals: state.router.activeModals,
        popouts: state.router.popouts,
        scrollPosition: state.router.scrollPosition,

        colorScheme: state.vkui.colorScheme
    };
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({ goBack, closeModal }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
