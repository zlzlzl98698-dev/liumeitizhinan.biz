import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import Layout from './Layout.vue';
import './custom.css';

import HomeHub from './components/HomeHub.vue';
import BrandDirectory from './components/BrandDirectory.vue';
import BrandProfile from './components/BrandProfile.vue';
import NetworkReport from './components/NetworkReport.vue';
import StreamingMatrix from './components/StreamingMatrix.vue';
import PricingTable from './components/PricingTable.vue';
import DiagnosticTool from './components/DiagnosticTool.vue';
import StreamingCheckCenter from './components/StreamingCheckCenter.vue';
import CompareCenter from './components/CompareCenter.vue';
import FaqBlock from './components/FaqBlock.vue';
import RelatedContent from './components/RelatedContent.vue';
import AffiliateButton from './components/AffiliateButton.vue';
import TopicClusterLinks from './components/TopicClusterLinks.vue';
import BrandReviewTelemetry from './components/BrandReviewTelemetry.vue';
import MultiplierCalculator from './components/MultiplierCalculator.vue';
import ImageLightbox from './components/ImageLightbox.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeHub', HomeHub);
    app.component('BrandDirectory', BrandDirectory);
    app.component('BrandProfile', BrandProfile);
    app.component('NetworkReport', NetworkReport);
    app.component('StreamingMatrix', StreamingMatrix);
    app.component('PricingTable', PricingTable);
    app.component('DiagnosticTool', DiagnosticTool);
    app.component('StreamingCheckCenter', StreamingCheckCenter);
    app.component('CompareCenter', CompareCenter);
    app.component('FaqBlock', FaqBlock);
    app.component('RelatedContent', RelatedContent);
    app.component('AffiliateButton', AffiliateButton);
    app.component('TopicClusterLinks', TopicClusterLinks);
    app.component('BrandReviewTelemetry', BrandReviewTelemetry);
    app.component('MultiplierCalculator', MultiplierCalculator);
    app.component('ImageLightbox', ImageLightbox);
  }
} satisfies Theme;
