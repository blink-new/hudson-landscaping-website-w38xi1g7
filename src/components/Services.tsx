import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Leaf, Sun, Palette, Snowflake, Clock, Users, DollarSign } from 'lucide-react'

// 25 services for each season
const services = {
  spring: [
    { name: 'Spring Cleanup', description: 'Complete yard cleanup after winter', hours: 4, category: 'Cleanup' },
    { name: 'Lawn Dethatching', description: 'Remove dead grass and debris', hours: 3, category: 'Lawn Care' },
    { name: 'Aeration', description: 'Core aeration for healthy grass growth', hours: 2, category: 'Lawn Care' },
    { name: 'Overseeding', description: 'Seed bare spots and thicken lawn', hours: 2, category: 'Lawn Care' },
    { name: 'Fertilizer Application', description: 'Spring fertilizer treatment', hours: 1, category: 'Lawn Care' },
    { name: 'Mulch Installation', description: 'Fresh mulch for flower beds', hours: 3, category: 'Landscaping' },
    { name: 'Tree Pruning', description: 'Prune trees for healthy growth', hours: 4, category: 'Tree Care' },
    { name: 'Shrub Trimming', description: 'Shape and trim shrubs', hours: 2, category: 'Plant Care' },
    { name: 'Flower Bed Preparation', description: 'Prepare beds for new plantings', hours: 3, category: 'Landscaping' },
    { name: 'Gutter Cleaning', description: 'Clean gutters and downspouts', hours: 2, category: 'Maintenance' },
    { name: 'Power Washing', description: 'Clean driveways and walkways', hours: 3, category: 'Cleaning' },
    { name: 'Irrigation System Check', description: 'Test and repair sprinkler systems', hours: 2, category: 'Irrigation' },
    { name: 'Weed Control Treatment', description: 'Pre-emergent weed prevention', hours: 1, category: 'Lawn Care' },
    { name: 'Soil Testing', description: 'Test soil pH and nutrients', hours: 1, category: 'Analysis' },
    { name: 'Compost Application', description: 'Organic compost for garden beds', hours: 2, category: 'Soil Care' },
    { name: 'Planting Annual Flowers', description: 'Plant colorful annual flowers', hours: 3, category: 'Planting' },
    { name: 'Vegetable Garden Setup', description: 'Prepare vegetable garden beds', hours: 4, category: 'Gardening' },
    { name: 'Lawn Edging', description: 'Clean edges around beds and walkways', hours: 2, category: 'Maintenance' },
    { name: 'Tree Fertilization', description: 'Deep root fertilization for trees', hours: 2, category: 'Tree Care' },
    { name: 'Perennial Planting', description: 'Plant perennial flowers and plants', hours: 3, category: 'Planting' },
    { name: 'Hardscape Cleaning', description: 'Clean patios, decks, and walkways', hours: 3, category: 'Cleaning' },
    { name: 'Garden Tool Sharpening', description: 'Sharpen and maintain garden tools', hours: 1, category: 'Maintenance' },
    { name: 'Bulb Planting', description: 'Plant spring flowering bulbs', hours: 2, category: 'Planting' },
    { name: 'Pest Control Treatment', description: 'Organic pest prevention treatment', hours: 1, category: 'Protection' },
    { name: 'Lawn Mowing Setup', description: 'First mow and equipment check', hours: 2, category: 'Lawn Care' }
  ],
  summer: [
    { name: 'Weekly Lawn Mowing', description: 'Regular grass cutting service', hours: 1.5, category: 'Lawn Care' },
    { name: 'Watering Systems Maintenance', description: 'Maintain irrigation systems', hours: 2, category: 'Irrigation' },
    { name: 'Flower Bed Weeding', description: 'Remove weeds from garden beds', hours: 2, category: 'Maintenance' },
    { name: 'Hedge Trimming', description: 'Trim and shape hedges', hours: 3, category: 'Plant Care' },
    { name: 'Deadheading Flowers', description: 'Remove spent blooms', hours: 1, category: 'Plant Care' },
    { name: 'Lawn Fertilization', description: 'Summer lawn feeding', hours: 1, category: 'Lawn Care' },
    { name: 'Mulch Refreshing', description: 'Add fresh mulch as needed', hours: 2, category: 'Landscaping' },
    { name: 'Tree Watering', description: 'Deep watering for mature trees', hours: 2, category: 'Tree Care' },
    { name: 'Pest Monitoring', description: 'Check for and treat pests', hours: 1, category: 'Protection' },
    { name: 'Disease Prevention', description: 'Preventive disease treatments', hours: 1, category: 'Protection' },
    { name: 'Lawn Edging', description: 'Maintain clean lawn edges', hours: 1, category: 'Maintenance' },
    { name: 'Container Garden Care', description: 'Maintain potted plants', hours: 1, category: 'Plant Care' },
    { name: 'Drought Stress Management', description: 'Help plants survive heat', hours: 2, category: 'Plant Care' },
    { name: 'Summer Pruning', description: 'Light pruning of select plants', hours: 2, category: 'Plant Care' },
    { name: 'Weed Control Treatment', description: 'Spot treat weeds', hours: 1, category: 'Lawn Care' },
    { name: 'Flower Replacement', description: 'Replace tired summer annuals', hours: 2, category: 'Planting' },
    { name: 'Lawn Overseeding', description: 'Overseed thin areas', hours: 2, category: 'Lawn Care' },
    { name: 'Garden Cleanup', description: 'Weekly garden maintenance', hours: 2, category: 'Maintenance' },
    { name: 'Sprinkler Adjustment', description: 'Adjust watering schedules', hours: 1, category: 'Irrigation' },
    { name: 'Outdoor Living Space Cleaning', description: 'Clean patios and decks', hours: 2, category: 'Cleaning' },
    { name: 'Shade Garden Maintenance', description: 'Care for shade plants', hours: 2, category: 'Plant Care' },
    { name: 'Lawn Aeration', description: 'Core aeration for compacted areas', hours: 2, category: 'Lawn Care' },
    { name: 'Perennial Maintenance', description: 'Care for perennial plants', hours: 2, category: 'Plant Care' },
    { name: 'Summer Planting', description: 'Plant heat-tolerant varieties', hours: 3, category: 'Planting' },
    { name: 'Irrigation Repair', description: 'Fix broken sprinkler heads', hours: 2, category: 'Irrigation' }
  ],
  fall: [
    { name: 'Leaf Removal', description: 'Rake and remove fallen leaves', hours: 4, category: 'Cleanup' },
    { name: 'Gutter Cleaning', description: 'Clean gutters before winter', hours: 2, category: 'Maintenance' },
    { name: 'Fall Fertilization', description: 'Winterizing lawn fertilizer', hours: 1, category: 'Lawn Care' },
    { name: 'Tree Pruning', description: 'Prune trees for winter', hours: 4, category: 'Tree Care' },
    { name: 'Winterizing Irrigation', description: 'Blow out sprinkler systems', hours: 2, category: 'Irrigation' },
    { name: 'Bulb Planting', description: 'Plant spring flowering bulbs', hours: 3, category: 'Planting' },
    { name: 'Perennial Cutting Back', description: 'Cut back perennial plants', hours: 2, category: 'Plant Care' },
    { name: 'Mulch Application', description: 'Winter mulch protection', hours: 3, category: 'Landscaping' },
    { name: 'Lawn Overseeding', description: 'Fall overseeding for thick lawn', hours: 2, category: 'Lawn Care' },
    { name: 'Garden Tool Winterizing', description: 'Clean and store garden tools', hours: 1, category: 'Maintenance' },
    { name: 'Annual Flower Removal', description: 'Remove spent annual plants', hours: 2, category: 'Cleanup' },
    { name: 'Compost Pile Management', description: 'Turn and manage compost', hours: 1, category: 'Soil Care' },
    { name: 'Tree Wrap Installation', description: 'Wrap young trees for winter', hours: 2, category: 'Tree Care' },
    { name: 'Rose Bush Preparation', description: 'Prepare roses for winter', hours: 2, category: 'Plant Care' },
    { name: 'Lawn Aeration', description: 'Fall core aeration', hours: 2, category: 'Lawn Care' },
    { name: 'Shrub Protection', description: 'Wrap or protect shrubs', hours: 2, category: 'Plant Care' },
    { name: 'Seed Collection', description: 'Collect seeds for next year', hours: 1, category: 'Gardening' },
    { name: 'Fall Cleanup', description: 'Complete property cleanup', hours: 5, category: 'Cleanup' },
    { name: 'Window Box Planting', description: 'Plant fall window displays', hours: 2, category: 'Planting' },
    { name: 'Drainage Inspection', description: 'Check drainage before winter', hours: 1, category: 'Maintenance' },
    { name: 'Hardscape Winterizing', description: 'Prepare patios for winter', hours: 2, category: 'Maintenance' },
    { name: 'Final Mowing', description: 'Last mow of the season', hours: 1.5, category: 'Lawn Care' },
    { name: 'Leaf Mulching', description: 'Mulch leaves into lawn', hours: 2, category: 'Lawn Care' },
    { name: 'Plant Division', description: 'Divide overgrown perennials', hours: 3, category: 'Plant Care' },
    { name: 'Winter Container Planting', description: 'Plant winter containers', hours: 2, category: 'Planting' }
  ],
  winter: [
    { name: 'Snow Plowing', description: 'Clear driveways and parking areas', hours: 2, category: 'Snow Removal' },
    { name: 'Sidewalk Shoveling', description: 'Hand shovel walkways', hours: 1, category: 'Snow Removal' },
    { name: 'Ice Control', description: 'Apply salt or ice melt', hours: 1, category: 'Ice Management' },
    { name: 'Roof Snow Removal', description: 'Remove dangerous snow loads', hours: 4, category: 'Snow Removal' },
    { name: 'Emergency Snow Service', description: '24/7 emergency snow removal', hours: 3, category: 'Emergency' },
    { name: 'Tree Branch Removal', description: 'Remove storm-damaged branches', hours: 3, category: 'Storm Damage' },
    { name: 'Pathway De-icing', description: 'Safe pathway ice removal', hours: 1, category: 'Ice Management' },
    { name: 'Snow Hauling', description: 'Remove and haul away snow', hours: 4, category: 'Snow Removal' },
    { name: 'Ice Dam Prevention', description: 'Prevent ice dam formation', hours: 2, category: 'Prevention' },
    { name: 'Winter Plant Protection', description: 'Protect plants from winter damage', hours: 2, category: 'Plant Care' },
    { name: 'Storm Cleanup', description: 'Clean up after winter storms', hours: 4, category: 'Storm Damage' },
    { name: 'Driveway Maintenance', description: 'Maintain snow removal equipment', hours: 1, category: 'Maintenance' },
    { name: 'Pre-Storm Preparation', description: 'Prepare property for storms', hours: 2, category: 'Prevention' },
    { name: 'Commercial Snow Removal', description: 'Large area snow clearing', hours: 6, category: 'Snow Removal' },
    { name: 'Heating System Area Clearing', description: 'Keep vents and units clear', hours: 1, category: 'Maintenance' },
    { name: 'Winter Tree Care', description: 'Winter pruning and care', hours: 3, category: 'Tree Care' },
    { name: 'Holiday Decoration Removal', description: 'Remove holiday lighting safely', hours: 2, category: 'Seasonal' },
    { name: 'Winter Equipment Storage', description: 'Store summer equipment', hours: 2, category: 'Storage' },
    { name: 'Snow Equipment Prep', description: 'Prepare snow removal equipment', hours: 1, category: 'Maintenance' },
    { name: 'Winter Landscape Planning', description: 'Plan next year improvements', hours: 2, category: 'Planning' },
    { name: 'Greenhouse Maintenance', description: 'Maintain winter growing spaces', hours: 2, category: 'Maintenance' },
    { name: 'Ice Sculpture Services', description: 'Create decorative ice features', hours: 4, category: 'Specialty' },
    { name: 'Winter Bird Feeding', description: 'Maintain bird feeding stations', hours: 1, category: 'Wildlife' },
    { name: 'Property Security Check', description: 'Winter property monitoring', hours: 1, category: 'Security' },
    { name: 'Winter Hardscape Care', description: 'Protect outdoor structures', hours: 2, category: 'Maintenance' }
  ]
}

const seasonIcons = {
  spring: <Leaf className="h-6 w-6" />,
  summer: <Sun className="h-6 w-6" />,
  fall: <Palette className="h-6 w-6" />,
  winter: <Snowflake className="h-6 w-6" />
}

const seasonColors = {
  spring: 'text-green-600',
  summer: 'text-yellow-600',
  fall: 'text-orange-600',
  winter: 'text-blue-600'
}

export default function Services() {
  const [selectedSeason, setSelectedSeason] = useState('spring')

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional landscaping and snow removal services tailored to each season. 
            All services are priced at $20/hour per person.
          </p>
        </div>

        <Tabs value={selectedSeason} onValueChange={setSelectedSeason} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {Object.entries(seasonIcons).map(([season, icon]) => (
              <TabsTrigger 
                key={season} 
                value={season} 
                className="flex items-center space-x-2 capitalize"
              >
                <span className={seasonColors[season as keyof typeof seasonColors]}>
                  {icon}
                </span>
                <span>{season}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(services).map(([season, serviceList]) => (
            <TabsContent key={season} value={season}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceList.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {service.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span>{service.hours}h</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-1" />
                          <span>Per person</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign size={16} className="mr-1" />
                          <span>$20/hr</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}