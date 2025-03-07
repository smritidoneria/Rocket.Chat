import { useEffect, Suspense, useSyncExternalStore } from 'react';

import DocumentTitleWrapper from './DocumentTitleWrapper';
import PageLoading from './PageLoading';
import { useEscapeKeyStroke } from './hooks/useEscapeKeyStroke';
import { useGoogleTagManager } from './hooks/useGoogleTagManager';
import { useMessageLinkClicks } from './hooks/useMessageLinkClicks';
import { useSettingsOnLoadSiteUrl } from './hooks/useSettingsOnLoadSiteUrl';
import { useAnalytics } from '../../../app/analytics/client/loadScript';
import { useDolphin } from '../../../app/dolphin/client/hooks/useDolphin';
import { useDrupal } from '../../../app/drupal/client/hooks/useDrupal';
import { useEmojiOne } from '../../../app/emoji-emojione/client/hooks/useEmojiOne';
import { useGitHubEnterpriseAuth } from '../../../app/github-enterprise/client/hooks/useGitHubEnterpriseAuth';
import { useGitLabAuth } from '../../../app/gitlab/client/hooks/useGitLabAuth';
import { useLivechatEnterprise } from '../../../app/livechat-enterprise/hooks/useLivechatEnterprise';
import { useNextcloud } from '../../../app/nextcloud/client/useNextcloud';
import { useAnalyticsEventTracking } from '../../hooks/useAnalyticsEventTracking';
import { useLoadRoomForAllowedAnonymousRead } from '../../hooks/useLoadRoomForAllowedAnonymousRead';
import { useNotifyUser } from '../../hooks/useNotifyUser';
import { appLayout } from '../../lib/appLayout';
import { useRedirectToSetupWizard } from '../../startup/useRedirectToSetupWizard';

const AppLayout = () => {
	useEffect(() => {
		document.body.classList.add('color-primary-font-color', 'rcx-content--main');

		return () => {
			document.body.classList.remove('color-primary-font-color', 'rcx-content--main');
		};
	}, []);

	useMessageLinkClicks();
	useGoogleTagManager();
	useAnalytics();
	useEscapeKeyStroke();
	useAnalyticsEventTracking();
	useLoadRoomForAllowedAnonymousRead();
	useNotifyUser();
	useEmojiOne();
	useRedirectToSetupWizard();
	useSettingsOnLoadSiteUrl();
	useLivechatEnterprise();
	useNextcloud();
	useGitLabAuth();
	useGitHubEnterpriseAuth();
	useDrupal();
	useDolphin();

	const layout = useSyncExternalStore(appLayout.subscribe, appLayout.getSnapshot);

	return (
		<Suspense fallback={<PageLoading />}>
			<DocumentTitleWrapper>{layout}</DocumentTitleWrapper>
		</Suspense>
	);
};

export default AppLayout;
