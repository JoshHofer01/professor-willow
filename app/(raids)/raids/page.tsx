import PageContainer from '@/components/PageContainer'
import RaidsDisplay from '@/components/RaidsGroup/RaidsDisplay';
import React from 'react'

const Raids = async () => {

  return (
    <PageContainer title='Current Raid Boss Rotation'>
         <RaidsDisplay />
    </PageContainer>
  )
}

export default Raids