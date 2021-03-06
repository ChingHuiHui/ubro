import apolloClient from '@/plugins/apolloClient'
import gql from 'graphql-tag'

export default async () => {
  try {
    const {
      data: { me },
    } = await apolloClient.query({
      query: gql`
        query me {
          me {
            phone
            point
            isAdmin
            exchangeRecords {
              id
              point
              productName
              createdAt
            }
            consumeRecords {
              id
              point
              createdAt
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
    })

    return me
  } catch (error) {
    console.log(error)
  }
}
