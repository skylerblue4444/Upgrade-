import { router } from "./_core/trpc";
import { AchievementsRouter } from "./routers/achievements";
import { AdminLiveRouter } from "./routers/admin-live";
import { AdminUnlockedRouter } from "./routers/admin-unlocked";
import { AdminRouter } from "./routers/admin";
import { AiAnalyticsRouter } from "./routers/ai-analytics";
import { AiDatingRouter } from "./routers/ai-dating";
import { AiFeedRouter } from "./routers/ai-feed";
import { AiModerationRouter } from "./routers/ai-moderation";
import { AiSecurityMonetizationRouter } from "./routers/ai-security-monetization";
import { AiTradingRoomRouter } from "./routers/ai-trading-room";
import { AmmDexRouter } from "./routers/amm-dex";
import { AnalyticsForecastingRouter } from "./routers/analytics-forecasting";
import { AuctionsRouter } from "./routers/auctions";
import { BarronTrumpCryptoRouter } from "./routers/barron-trump-crypto";
import { BreathingInfrastructureRouter } from "./routers/breathing-infrastructure";
import { CasinoRouter } from "./routers/casino";
import { CharityEnhancedRouter } from "./routers/charity-enhanced";
import { CharityRouter } from "./routers/charity";
import { CoinEconomyRouter } from "./routers/coin-economy";
import { CommerceMarketplaceRouter } from "./routers/commerce-marketplace";
import { CreatorAnalyticsRouter } from "./routers/creator-analytics";
import { CryptoEngineRouter } from "./routers/crypto-engine";
import { CryptoExchangeRouter } from "./routers/crypto-exchange";
import { CryptoInfrastructureRouter } from "./routers/crypto-infrastructure";
import { CryptoPaymentsRouter } from "./routers/crypto-payments";
import { cryptoRouter } from "./routers/crypto";
import { DaoGovernanceRouter } from "./routers/dao-governance";
import { DaoRouter } from "./routers/dao";
import { DataIntelligenceRouter } from "./routers/data-intelligence";
import { DatingRouter } from "./routers/dating";
import { DayTradingAutomationRouter } from "./routers/day-trading-automation";
import { DevAiInterfaceRouter } from "./routers/dev-ai-interface";
import { engineerRouter } from "./routers/engineer-dev-mode";
import { EnterpriseSecurityRouter } from "./routers/enterprise-security";
import { FeedRouter } from "./routers/feed";
import { FinanceRouter } from "./routers/finance";
import { FreeWillAgentsRouter } from "./routers/free-will-agents";
import { GamesRouter } from "./routers/games";
import { GamificationRouter } from "./routers/gamification";
import { GlobalCdnRouter } from "./routers/global-cdn";
import { GovernanceRouter } from "./routers/governance";
import { HopeAiCoreRouter } from "./routers/hope-ai-core";
import { HopeAiEngineRouter } from "./routers/hope-ai-engine";
import { hopeNeuralRouter } from "./routers/hope-ai-neural";
import { HopeAiVoiceNavRouter } from "./routers/hope-ai-voice-nav";
import { HopeAiRouter } from "./routers/hope-ai";
import { IcoShopRouter } from "./routers/ico-shop";
import { impactRouter } from "./routers/impact-engine";
import { LiveIcoShopRouter } from "./routers/live-ico-shop";
import { LiveMiningRouter } from "./routers/live-mining";
import { LivePaymentsRouter } from "./routers/live-payments";
import { LiveSocialRouter } from "./routers/live-social";
import { LiveStakingRouter } from "./routers/live-staking";
import { LiveTradeScreenRouter } from "./routers/live-trade-screen";
import { LivestreamRouter } from "./routers/livestream";
import { ManusModeRouter } from "./routers/manus-mode";
import { MarketDataRouter } from "./routers/market-data";
import { MarketplaceDisputesRouter } from "./routers/marketplace-disputes";
import { MarketplaceLiveRouter } from "./routers/marketplace-live";
import { MarketplaceRouter } from "./routers/marketplace";
import { MaxProfitAlgorithmsRouter } from "./routers/max-profit-algorithms";
import { MediaHubRouter } from "./routers/media-hub";
import { MessagingRouter } from "./routers/messaging";
import { MiniProgramsRouter } from "./routers/mini-programs";
import { MiningRouter } from "./routers/mining";
import { NftMarketplaceRouter } from "./routers/nft-marketplace";
import { NotificationsRouter } from "./routers/notifications";
import { PaymentsRouter } from "./routers/payments";
import { PlatformRouter } from "./routers/platform";
import { PremiumAnalyticsRouter } from "./routers/premium-analytics";
import { PrivacySuiteRouter } from "./routers/privacy-suite";
import { PrivacyToolsRouter } from "./routers/privacy-tools";
import { ProSubscriptionsRouter } from "./routers/pro-subscriptions";
import { ProfitStreamsRouter } from "./routers/profit-streams";
import { QuantumIntelligenceRouter } from "./routers/quantum-intelligence";
import { RealtimeRouter } from "./routers/realtime";
import { ReferralsRouter } from "./routers/referrals";
import { SearchRouter } from "./routers/search";
import { SkycoinRouter } from "./routers/skycoin";
import { skycoin4444Router } from "./routers/skycoin4444-core";
import { SocialInnovationRouter } from "./routers/social-innovation";
import { SocialRouter } from "./routers/social";
import { SovereignIdeRouter } from "./routers/sovereign-ide";
import { SovereignPolicyRouter } from "./routers/sovereign-policy";
import { StakingRouter } from "./routers/staking";
import { swarmRouter } from "./routers/swarm";
import { TwoFactorAuthRouter } from "./routers/two-factor-auth";
import { UnifiedCryptoRouter } from "./routers/unified-crypto";
import { VoiceHopeAiRouter } from "./routers/voice-hope-ai";
import { VoiceNavigationRouter } from "./routers/voice-navigation";
import { VolunteerEventsRouter } from "./routers/volunteer-events";
import { Web3Router } from "./routers/web3";
import { YoutubePuzzlesRouter } from "./routers/youtube-puzzles";

export const appRouter = router({
  achievements: AchievementsRouter,
  adminLive: AdminLiveRouter,
  adminUnlocked: AdminUnlockedRouter,
  admin: AdminRouter,
  aiAnalytics: AiAnalyticsRouter,
  aiDating: AiDatingRouter,
  aiFeed: AiFeedRouter,
  aiModeration: AiModerationRouter,
  aiSecurityMonetization: AiSecurityMonetizationRouter,
  aiTradingRoom: AiTradingRoomRouter,
  ammDex: AmmDexRouter,
  analyticsForecasting: AnalyticsForecastingRouter,
  auctions: AuctionsRouter,
  barronTrumpCrypto: BarronTrumpCryptoRouter,
  breathingInfrastructure: BreathingInfrastructureRouter,
  casino: CasinoRouter,
  charityEnhanced: CharityEnhancedRouter,
  charity: CharityRouter,
  coinEconomy: CoinEconomyRouter,
  commerceMarketplace: CommerceMarketplaceRouter,
  creatorAnalytics: CreatorAnalyticsRouter,
  cryptoEngine: CryptoEngineRouter,
  cryptoExchange: CryptoExchangeRouter,
  cryptoInfrastructure: CryptoInfrastructureRouter,
  cryptoPayments: CryptoPaymentsRouter,
  crypto: cryptoRouter,
  daoGovernance: DaoGovernanceRouter,
  dao: DaoRouter,
  dataIntelligence: DataIntelligenceRouter,
  dating: DatingRouter,
  dayTradingAutomation: DayTradingAutomationRouter,
  devAiInterface: DevAiInterfaceRouter,
  engineerDevMode: engineerRouter,
  enterpriseSecurity: EnterpriseSecurityRouter,
  feed: FeedRouter,
  finance: FinanceRouter,
  freeWillAgents: FreeWillAgentsRouter,
  games: GamesRouter,
  gamification: GamificationRouter,
  globalCdn: GlobalCdnRouter,
  governance: GovernanceRouter,
  hopeAiCore: HopeAiCoreRouter,
  hopeAiEngine: HopeAiEngineRouter,
  hopeAiNeural: hopeNeuralRouter,
  hopeAiVoiceNav: HopeAiVoiceNavRouter,
  hopeAi: HopeAiRouter,
  icoShop: IcoShopRouter,
  impactEngine: impactRouter,
  liveIcoShop: LiveIcoShopRouter,
  liveMining: LiveMiningRouter,
  livePayments: LivePaymentsRouter,
  liveSocial: LiveSocialRouter,
  liveStaking: LiveStakingRouter,
  liveTradeScreen: LiveTradeScreenRouter,
  livestream: LivestreamRouter,
  manusMode: ManusModeRouter,
  marketData: MarketDataRouter,
  marketplaceDisputes: MarketplaceDisputesRouter,
  marketplaceLive: MarketplaceLiveRouter,
  marketplace: MarketplaceRouter,
  maxProfitAlgorithms: MaxProfitAlgorithmsRouter,
  mediaHub: MediaHubRouter,
  messaging: MessagingRouter,
  miniPrograms: MiniProgramsRouter,
  mining: MiningRouter,
  nftMarketplace: NftMarketplaceRouter,
  notifications: NotificationsRouter,
  payments: PaymentsRouter,
  platform: PlatformRouter,
  premiumAnalytics: PremiumAnalyticsRouter,
  privacySuite: PrivacySuiteRouter,
  privacyTools: PrivacyToolsRouter,
  proSubscriptions: ProSubscriptionsRouter,
  profitStreams: ProfitStreamsRouter,
  quantumIntelligence: QuantumIntelligenceRouter,
  realtime: RealtimeRouter,
  referrals: ReferralsRouter,
  search: SearchRouter,
  skycoin: SkycoinRouter,
  skycoin4444Core: skycoin4444Router,
  socialInnovation: SocialInnovationRouter,
  social: SocialRouter,
  sovereignIde: SovereignIdeRouter,
  sovereignPolicy: SovereignPolicyRouter,
  staking: StakingRouter,
  swarm: swarmRouter,
  twoFactorAuth: TwoFactorAuthRouter,
  unifiedCrypto: UnifiedCryptoRouter,
  voiceHopeAi: VoiceHopeAiRouter,
  voiceNavigation: VoiceNavigationRouter,
  volunteerEvents: VolunteerEventsRouter,
  web3: Web3Router,
  youtubePuzzles: YoutubePuzzlesRouter,
});

export type AppRouter = typeof appRouter;
