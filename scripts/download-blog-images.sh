#!/bin/bash

# Download blog post images
cd /Users/kirniy/dev/adapty-pt2/public/blog

# Array of image URLs and their slugs
declare -A images=(
  ["what-does-restore-purchase-mean"]="https://adapty.io/assets/uploads/2025/12/NameWhat-Does-Restore-Purchase-Mean.png"
  ["why-users-delete-your-app-in-24-hours"]="https://adapty.io/assets/uploads/2025/11/Why-45-of-users-delete-your-app-within-24-hours-1.webp"
  ["how-to-fix-your-onboarding-flow"]="https://adapty.io/assets/uploads/2025/11/How-to-fix-your-app-onboarding-flow.webp"
  ["how-to-build-app-onboarding-flows-that-convert"]="https://adapty.io/assets/uploads/2025/11/How-to-build-onboarding-flows-that-convert.webp"
  ["app-analytics-stack-explained"]="https://adapty.io/assets/uploads/2025/10/metrics-explained.webp"
  ["unlocking-growth-to-100k-mrr"]="https://adapty.io/assets/uploads/2025/10/Nameebook_10k_100k_MRR.webp"
  ["how-adapty-keeps-running"]="https://adapty.io/assets/uploads/2025/10/covers-2025.webp"
  ["paywall-newsletter-26"]="https://adapty.io/assets/uploads/2025/10/opengraph_newsletter%E2%80%A8-26-1.webp"
  ["introducing-adapty-finance"]="https://adapty.io/assets/uploads/2025/09/adapty_finance_cover@1x.jpg"
  ["paywall-newsletter-25"]="https://adapty.io/assets/uploads/2025/09/opengraph_newsletter25.png"
  ["paywall-newsletter-24"]="https://adapty.io/assets/uploads/2025/09/opengraph_newsletter24.webp"
  ["how-friction-can-grow-your-apps-revenue"]="https://adapty.io/assets/uploads/2025/08/revenuethroughfriction.webp"
  ["paywall-newsletter-23"]="https://adapty.io/assets/uploads/2025/08/newsletter23updated.webp"
  ["how-to-analyze-and-optimize-apple-ads"]="https://adapty.io/assets/uploads/2025/08/How-to-analyze-and-optimize-Apple-Ads.webp"
  ["apple-ads-best-practices"]="https://adapty.io/assets/uploads/2025/08/NameApple-Ads_-Tips-best-practices-1.webp"
  ["paywall-newsletter-22"]="https://adapty.io/assets/uploads/2025/08/opengraph_newsletter22.webp"
  ["how-health-and-fitness-apps-nail-upselling-on-ios"]="https://adapty.io/assets/uploads/2025/08/How-Health-Fitness-Apps-Nail-Upselling-on-iOS.webp"
  ["apple-search-ads"]="https://adapty.io/assets/uploads/2025/08/The-complete-guide-to-Apple-Ads.webp"
  ["selling-your-app-for-maximum-value"]="https://adapty.io/assets/uploads/2025/07/howtosellanapp.webp"
  ["9-subscription-trends-dominating-2025"]="https://adapty.io/assets/uploads/2025/07/9-subscription-trends-dominating-2025.webp"
  ["paywall-newsletter-21"]="https://adapty.io/assets/uploads/2025/07/opengraph_newsletter21-new.webp"
  ["how-to-lower-cac-with-ad-platform-signals"]="https://adapty.io/assets/uploads/2025/06/NameName32.webp"
  ["state-of-in-app-subscriptions-2025-in-10-minutes"]="https://adapty.io/assets/uploads/2025/06/SOIAS-cover.webp"
  ["apple-eu-in-app-purchase-fee-system-2025"]="https://adapty.io/assets/uploads/2025/06/fee-system-in-app-purchase-preview-1.webp"
  ["from-pmf-to-profit-in-subscription-app"]="https://adapty.io/assets/uploads/2025/06/CP-PMF-to-profit-preview-1.webp"
  ["quickstart-adapty-setup-guide-react-native-with-expo"]="https://adapty.io/assets/uploads/2025/06/Quickstart-Guide_React-Native.png"
  ["wwdc25-what-apple-announced"]="https://adapty.io/assets/uploads/2025/06/WWDC25_-What-Apple-announced-and-what-does-it-mean-for-app-developers-preview-1.webp"
  ["how-to-build-personalized-paywalls"]="https://adapty.io/assets/uploads/2025/06/How-to-build-personalized-paywalls-with-user-attributes-and-Adapty-segments-1-preview-1.webp"
  ["add-android-in-app-purchases-to-your-app"]="https://adapty.io/assets/uploads/2025/06/Add-Subscriptions-to-Your-Android-App-with-Adapty-in-10-Minutes-2025-Guide-preview-1.webp"
  ["quickstart-adapty-setupguide-ios-with-swiftui"]="https://adapty.io/assets/uploads/2025/06/Quickstart-Guide_-iOS-with-SwiftUI-2-preview-1.webp"
  ["how-to-use-push-notifications-to-increase-app-revenue"]="https://adapty.io/assets/uploads/2025/06/How-to-message-cohorts-correctly-preview-1.webp"
  ["quickstart-adapty-setup-guide-ios-with-uikit"]="https://adapty.io/assets/uploads/2025/06/Quickstart-Guide_-iOS-with-SwiftUI-2-preview-1.webp"
  ["guide-to-ad-testing"]="https://adapty.io/assets/uploads/2025/07/Cover-Ad-testing.webp"
  ["validating-iap-with-app-store-server-api"]="https://adapty.io/assets/uploads/2025/07/cover-app-store-server-api.webp"
  ["revenuecat-alternatives-why-i-switched-to-adapty"]="https://adapty.io/assets/uploads/2025/05/cover-StoreKit-to-Adapty.webp"
  ["mobile-app-monetization-strategies"]="https://adapty.io/assets/uploads/2025/05/Mobile-app-monetization.png"
  ["can-you-use-stripe-for-in-app-purchases"]="https://adapty.io/assets/uploads/2025/05/Stripe-for-in-app-purchases.webp"
  ["google-app-campaigns-playbook-2025"]="https://adapty.io/assets/uploads/2025/05/cover-google-app-campaigns-playbook-2025.webp"
  ["new-us-ruling-on-external-ios-payments"]="https://adapty.io/assets/uploads/2025/05/New-US-Ruling-on-iOS-Payments.webp"
  ["how-to-ab-test-free-trials-on-ios"]="https://adapty.io/assets/uploads/2025/05/cover-how-to-ab-test-free-trials-on-ois.webp"
  ["why-japanese-aso-creatives-need-different-strategy"]="https://adapty.io/assets/uploads/2025/05/Japanese-ASO-Creatives.webp"
  ["how-to-reduce-early-churn"]="https://adapty.io/assets/uploads/2025/05/Overcoming-Death-Valley-Guide.png"
  ["why-your-web-to-app-funnel-is-broken-and-how-to-fix-it"]="https://adapty.io/assets/uploads/2025/05/Why-your-web-to-app-funnel-is-broken-and-how-to-fix-it.png"
  ["paywall-newsletter-20"]="https://adapty.io/assets/uploads/2025/05/opengraph_newsletter20_16x9.webp"
  ["how-to-optimize-aso-for-japan"]="https://adapty.io/assets/uploads/2025/05/How-to-optimize-ASO-for-Japan.png"
  ["what-is-web-to-app-and-how-does-it-work"]="https://adapty.io/assets/uploads/2025/05/w2a-1-featurePic.png"
  ["february-adapty-updates-rich-text-smarter-taxes-and-more"]="https://adapty.io/assets/uploads/2025/05/adapty-february-updates.png"
  ["what-japanese-paywalls-look-like-and-why-western-strategies-wont-work"]="https://adapty.io/assets/uploads/2025/05/Property-1covers-2024-Property-2Property-24-1.webp"
)

# Download each image
for slug in "${!images[@]}"; do
  url="${images[$slug]}"
  # Get file extension from URL
  ext="${url##*.}"
  # Handle URL-encoded characters
  ext=$(echo "$ext" | cut -d'?' -f1 | cut -d'@' -f1)
  if [[ "$ext" == "jpg" ]] || [[ "$ext" == "jpeg" ]] || [[ "$ext" == "png" ]] || [[ "$ext" == "webp" ]]; then
    output_file="${slug}.${ext}"
  else
    output_file="${slug}.webp"
  fi

  echo "Downloading: $slug"
  curl -sL "$url" -o "$output_file" 2>/dev/null

  if [ -f "$output_file" ] && [ -s "$output_file" ]; then
    echo "  ✓ Saved as $output_file"
  else
    echo "  ✗ Failed to download"
    rm -f "$output_file"
  fi
done

echo ""
echo "Download complete!"
ls -la | head -20
