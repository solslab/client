'use client';

import React, { useState } from 'react';
import SearchDropDown from './searchDropdown';
import Search from './search';

const SearchComboBox = ({ query }: { query: string }) => {
	return (
		<div className="relative">
			<Search placeholder="지금 바로 기업을 검색해 보세요!" />
			<div>
				<SearchDropDown query={query} />
			</div>
		</div>
	);
};

export default SearchComboBox;
