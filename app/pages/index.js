import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout'
import { Link } from '../routes'; 


class CampaignIndex extends Component {
    static async getInitialProps() {
        
        const campaigns = [];//await factory.methods.getDeployedSales().call();

        return { campaigns };
    }

    renderCampaigns() {
        

        // const items = this.props.campaigns.map(address => {
        //     return {
        //         header: address,
        //         description: (<Link route={ `/campaigns/${address}` }>
        //             <a>View Campaign</a>
        //         </Link>),
        //         fluid: true
        //     }
        // });


        const items = [
            {
              header: 'Project Report - April',
              description:
                'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
              meta: 'ROI: 30%',
            },
            {
              header: 'Project Report - May',
              description:
                'Bring to the table win-win survival strategies to ensure proactive domination.',
              meta: 'ROI: 34%',
            },
            {
              header: 'Project Report - June',
              description:
                'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
              meta: 'ROI: 27%',
            },
          ]

        return <Card.Group items={items} />
    }

    render() {
        return (
        <Layout>
            <div>
                
                <h3>Open Campaigns</h3>
                
                <Link route="/campaigns/new">
                    <a>
                        <Button floated="right" content="Create Campaign" icon="add circle" primary />
                    </a>
                </Link>
                
                

                { this.renderCampaigns() }
            </div>
        </Layout>
        );
    }
}

export default CampaignIndex;