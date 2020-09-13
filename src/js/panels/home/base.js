import React from 'react';
import { connect } from 'react-redux';

import { closePopout, goBack, openModal, openPopout, setPage, setStory } from '../../store/router/actions';

import { Div, Panel, Alert, Group, Button, PanelHeader } from "@vkontakte/vkui"

class HomePanelBase extends React.Component {

    state = {
        showImg: false
    };

    showImg = () => {
        this.setState({ showImg: true });
    };

    render() {
        const { id, setPage, withoutEpic } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Пожертвования</PanelHeader>
                <Group className='main-page'>
                    <Div className="main-text">
                        У вас пока нет сборов.
                        <br />
                        Начните доброе дело.
                        <Button className="main-button" size='l' onClick={() => setPage('create-donate', 'type')}>Создать сбор</Button>
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

export default connect(null, mapDispatchToProps)(HomePanelBase);
