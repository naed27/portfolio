import styles from './SearchArea.module.css'
import PageButtons from './PageButtons/Components/PageButtons';
import Table from './SearchTable/Components/Table';
import SearchFields from './SearchFields/SearchFields';
import { motion } from 'framer-motion';
import animation from './Animation';

const SearchArea = () => {
  return (
    < motion.div className={ styles.container }
      variants = { animation }
      initial = 'initial'
      animate = 'final'
      exit = 'exit' >
      <SearchFields/>
      <Table/>
      <PageButtons/>
    </motion.div>
  )
}

export default SearchArea