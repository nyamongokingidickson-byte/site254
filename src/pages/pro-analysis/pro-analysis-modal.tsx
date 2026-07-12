import React from 'react';
import { observer } from 'mobx-react-lite';
import DraggableResizeWrapper from '@/components/draggable/draggable-resize-wrapper';
import { useStore } from '@/hooks/useStore';
import { localize } from '@deriv-com/translations';
import IframeWrapper from '@/components/iframe-wrapper';
import './pro-analysis.scss';

const ProAnalysisModal = observer(() => {
    const { dashboard } = useStore();
    const { is_pro_analysis_modal_visible, setProAnalysisModalVisibility } = dashboard;

    return (
        <React.Fragment>
            {is_pro_analysis_modal_visible && (
                <DraggableResizeWrapper
                    boundary='.main'
                    header={localize('Pro Analysis Tool')}
                    onClose={setProAnalysisModalVisibility}
                    modalWidth={980}
                    modalHeight={760}
                    minWidth={720}
                    minHeight={560}
                    enableResizing
                >
                    <div className='pro-analysis-modal' data-testid='pro-analysis-modal'>
                        <IframeWrapper
                            src='https://analysisprofithub.vercel.app/'
                            title='Pro Analysis Tool'
                            className='pro-analysis-modal__iframe'
                        />
                    </div>
                </DraggableResizeWrapper>
            )}
        </React.Fragment>
    );
});

export default ProAnalysisModal;
