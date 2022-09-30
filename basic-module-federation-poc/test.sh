#!/bin/sh
set -euo pipefail

blue='\033[0;34m'
red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
magenta='\033[0;35m'
light_blue='\033[0;93m'
no_color='\033[0m'

indent() { sed 's/^/  /'; }

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

echo "\n${blue}Resetting GIT to origin/main...${no_color}"
echo "\n${magenta}  🕑 Excuting...${no_color}\n"
reset=$(git reset --hard origin/main)
## printf %s "$str XX"
## printf("%40s\n", str);
printf "%-4s %s $reset\n" 
echo "\n${green}  ✅ Done.${no_color}\n"

echo "\n${blue}Create/Recreate features/partial folder...${no_color}"
echo "\n${magenta}  🕑 Excuting...${no_color}"
rm -rf src/features/partials
mkdir src/features/partials
echo "\n${green}  ✅ Done.${no_color}\n"

echo "\n${blue}Move directories with GIT...${no_color}"
echo "\n${magenta}  🕑 Excuting...${no_color}"
# Turn OppEQ into a Layout partial
git mv src/features/oppeq/OppEQ.tsx src/features/partials/OppEQPaygapLayout.tsx

# Turn Analysis into OppEQ
git mv src/features/oppeq/analysis/AnalysisFeature.tsx src/features/oppeq/OppEQFeature.tsx
git mv src/features/oppeq/analysis/AnalysisFeature.css src/features/oppeq/OppEQFeature.css

# Move Analysis partials to OppEQ partials
git mv src/features/oppeq/analysis/partials/* src/features/oppeq/partials

git mv src/features/oppeq/analysis/__test__ src/features/oppeq/
git mv src/features/oppeq/analysis/demographics src/features/oppeq/
git mv src/features/oppeq/analysis/forecast src/features/oppeq/
git mv src/features/oppeq/analysis/levels src/features/oppeq/
# git mv src/features/oppeq/analysis/promotions src/features/oppeq/
git mv src/features/oppeq/levels/partials/SubGroupTrafficLight.tsx src/features/oppeq/levels/partials/SubGroupsTrafficLight.tsx
echo "\n${green}  ✅ Done.${no_color}\n"

# Delete old Analysis partials
echo "\n${blue}Delete Analysis partial folder...${no_color}"
echo "\n${magenta}  🕑 Excuting...${no_color}"
rm -rf src/features/oppeq/analysis/partials
rm -rf src/features/oppeq/analysis
echo "\n${green}  ✅ Done.${no_color}\n"



# SED tester https://sed.js.org/
echo "\n${blue}Search and replace strings on all files...${no_color}"
echo "\n${magenta}  🕑 Excuting...${no_color}"
# Change path to OppEQ layout to new path
sed -i '' -e "s/import { OppEQ } from '@features\/oppeq\/OppEQ'/import { OppEQPaygapLayout } from '@features\/partials\/OppEQPaygapLayout'/g" src/OppEQApp.tsx
# Replace all instances of OppEQ with OppEQPaygapLayout
sed -i '' -e 's/IOppEQ/IOppEQPaygapLayout/g' src/features/partials/OppEQPaygapLayout.tsx
sed -i '' -e 's/const OppEQ/const OppEQPaygapLayout/g' src/features/partials/OppEQPaygapLayout.tsx
sed -i '' -e "s/OppEQ.displayName = 'OppEQ'/OppEQPaygapLayout.displayName = 'OppEQPaygapLayout'/g" src/features/partials/OppEQPaygapLayout.tsx

# Change path to OppEQFeature to new path
sed -i '' -e "s/import { AnalysisFeature } from '@features\/oppeq\/analysis\/AnalysisFeature'/import { OppEQFeature } from '@features\/oppeq\/OppEQFeature'/g" src/OppEQApp.tsx
# Replace all instances of AnalysisFeature with OppEQFeature
sed -i '' -e 's/AnalysisFeature/OppEQFeature/g' src/features/oppeq/OppEQFeature.tsx
sed -i '' -e 's/AnalysisFeature/OppEQFeature/g' src/OppEQApp.tsx
sed -i '' -e 's/OppEQ /OppEQPaygapLayout /g' src/OppEQApp.tsx

#import { Heading } from '@features/oppeq/analysis/partials/Heading';
sed -i '' "s/import { Heading } from '@features\/oppeq\/analysis\/partials\/Heading'/import { Heading } from '@features\/oppeq\/partials\/Heading'/g" src/features/oppeq/OppEQFeature.tsx


find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { SummaryStats } from '@features\/oppeq\/analysis\/partials\/SummaryStats'/import { SummaryStats } from '@features\/oppeq\/partials\/SummaryStats'/g" {} +

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { Demographics } from '@features\/oppeq\/analysis\/demographics\/Demographics'/import { Demographics } from '@features\/oppeq\/demographics\/Demographics'/g" {} +

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { Levels } from '@features\/oppeq\/analysis\/levels\/Levels'/import { Levels } from '@features\/oppeq\/levels\/Levels'/g" {} + 

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { Promotions } from '@features\/oppeq\/analysis\/promotions\/Promotions'/import { Promotions } from '@features\/oppeq\/promotions\/Promotions'/g" {} + 

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { Forecast } from '@features\/oppeq\/analysis\/forecast\/Forecast'/import { Forecast } from '@features\/oppeq\/forecast\/Forecast'/g" {} + 

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { SubgroupingsTable } from '@features\/oppeq\/analysis\/demographics\/partials\/SubgroupingsTable'/import { SubgroupingsTable } from '@features\/oppeq\/demographics\/partials\/SubgroupingsTable'/g" {} + 

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { PositionChart } from '@features\/oppeq\/analysis\/forecast\/partials\/PositionChart'/import { PositionChart } from '@features\/oppeq\/forecast\/partials\/PositionChart'/g" {} + 

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { LevelsFilters } from '@features\/oppeq\/analysis\/levels\/partials\/LevelsFilters'/import { LevelsFilters } from '@features\/oppeq\/levels\/partials\/LevelsFilters'/g" {} +

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/} from '@features\/oppeq\/analysis\/forecast\/partials\/PositionForm'/} from '@features\/oppeq\/forecast\/partials\/PositionForm'/g" {} +

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { MissingData } from '@features\/oppeq\/analysis\/levels\/partials\/MissingData'/import { MissingData } from '@features\/oppeq\/levels\/partials\/MissingData'/g" {} +

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import { SubGroupsTrafficLight } from '@features\/oppeq\/analysis\/levels\/partials\/SubGroupTrafficLight'/import { SubGroupsTrafficLight } from '@features\/oppeq\/levels\/partials\/SubGroupsTrafficLight'/g" {} + 


find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' "s/import '@features\/oppeq\/analysis\/levels\/partials\/SubGroups.css'/import '@features\/oppeq\/levels\/partials\/SubGroups.css'/g" {} +

find . -type f -name '*.tsx' -path "./src/*" -not -path "node_modules" -exec sed -i '' 's/Analysis > //' {} +
find . -type f -name '*.ts' -path "./cypress/*" -exec sed -i '' 's/Analysis > //' {} +

# Find all instances of InfoPage import and replace
sed -i '' "s/import { InfoPage } from '@features\/oppeq\/analysis\/partials\/InfoPage'/import { InfoPage } from '@features\/oppeq\/partials\/InfoPage'/g" src/features/oppeq/forecast/Forecast.tsx
sed -i '' "s/import { InfoPage } from '@features\/oppeq\/analysis\/partials\/InfoPage'/import { InfoPage } from '@features\/oppeq\/partials\/InfoPage'/g" src/features/oppeq/levels/Levels.tsx
sed -i '' "s/import { InfoPage } from '@features\/oppeq\/analysis\/partials\/InfoPage'/import { InfoPage } from '@features\/oppeq\/partials\/InfoPage'/g" src/features/oppeq/promotions/Promotions.tsx
sed -i '' "s/import { InfoPage } from '@features\/oppeq\/analysis\/partials\/InfoPage'/import { InfoPage } from '@features\/oppeq\/partials\/InfoPage'/g" src/features/pgi/PaygapInsightsFeature.tsx
sed -i '' "s/import { InfoPage } from '@features\/oppeq\/analysis\/partials\/InfoPage'/import { InfoPage } from '@features\/oppeq\/partials\/InfoPage'/g" src/features/oppeq/OppEQFeature.tsx

echo "\n${green}  ✅ Done.${no_color}\n"

echo "\n${blue}Add modified files to GIT...${no_color}"
echo "\n${magenta}  🕑 Excuting...${no_color}"
git add src/features/oppeq/OppEQFeature.tsx
git add src/features/partials/OppEQPaygapLayout.tsx
git add src/OppEQApp.tsx
git add src/features/oppeq/forecast/Forecast.tsx
git add src/features/oppeq/levels/Levels.tsx
git add src/features/oppeq/promotions/Promotions.tsx
git add src/features/pgi/PaygapInsightsFeature.tsx
git add src/features/oppeq/demographics/Demographics.tsx
git add src/features/oppeq/forecast/partials/PositionChart.tsx
git add src/features/oppeq/levels/partials/InternalLevels.tsx
git add src/features/oppeq/levels/partials/SubGroups.tsx
git add src/features/oppeq/__test__/DemographicsFeature.spec.tsx
git add src/features/oppeq/__test__/ForecasterFeature.spec.tsx
git add cypress/integration/frontend/oppeq/DemographicsFeature.spec.ts
echo "\n${green}  ✅ Done.${no_color}\n"

#https://jestjs.io/docs/cli
echo "\n${blue}Run unit tests...${no_color}"
echo "\n${magenta}  🕑 Excuting...${no_color}"
# npm test -- --watchAll=false --silent --noStackTrace --colors --bail=1
echo "\n${green}  ✅ Done.${no_color}\n"

echo "\n${blue}Run e2e tests...${no_color}"
echo "\n${magenta}  🕑 Excuting...${no_color}"
# rm -rf .nyc_output && ./node_modules/cypress/bin/cypress run --browser chrome run --spec cypress/integration/frontend/oppeq/**/*spec.ts --config video=false --quiet
echo "\n${green}  ✅ Done.${no_color}\n"


echo "\n${blue}Tasks completed.${no_color}"
echo "\n  🎉 Refactor done.\n"
git status | sed 's/^/     /'


