<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2015 Amasty (https://www.amasty.com)
 * @package Amasty_Finder
 */  
class Amasty_Finder_Model_Dropdown extends Mage_Core_Model_Abstract
{
    public function _construct()
    {    
        $this->_init('amfinder/dropdown');
    }
    
    public function getValues($parentId, $selected=0)
    {
        $options[] = array(
            'value'    => 0, 
            'label'    => $this->getName(),
            'selected' => false,
        );
        
        $collection = Mage::getModel('amfinder/value')->getCollection()
            ->addFieldToFilter('parent_id', $parentId);
            
        if (!$this->getPos()){
            $collection->addFieldToFilter('dropdown_id', $this->getId());    
        }
        switch ($this->getSort()) {
            case Amasty_Finder_Helper_Data::SORT_STRING_ASC :
                $order = 'name ASC'; 
                break;
            case Amasty_Finder_Helper_Data::SORT_STRING_DESC :
                $order = 'name DESC'; 
                break;
            case Amasty_Finder_Helper_Data::SORT_NUM_ASC :
                $order = new Zend_Db_Expr('ceil(name) ASC');
                break;
            case Amasty_Finder_Helper_Data::SORT_NUM_DESC :
                $order = new Zend_Db_Expr('ceil(name) DESC');
                break;                
        }
       
        $collection->getSelect()->order($order);
        foreach ($collection as $option){
            $options[] = array(
                'value'    => $option->getValueId(), 
                'label'    => Mage::helper('amfinder')->__($option->getName()),
                'selected' => ($selected == $option->getValueId()),
            );
        }
        
        
        
        return $options;
    }
}