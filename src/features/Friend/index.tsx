import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import conversationApi from '@/api/conversationApi';
import FilterContainer from '@/components/FilterContainer';
import SearchContainer from '@/features/Chat/containers/SearchContainer';

import HeaderFriend from './components/HeaderFiend';
import ContactItem from './components/ContactItem';
import ListFriend from './components/ListFriend';
import ListGroup from './components/ListGroup';
import ListMyFriendRequest from './components/ListMyRequestFriend';
import ListRequestFriend from './components/ListRequestFriend';
import SuggestList from './components/SuggestList';

import {
  fetchFriends,
  fetchListGroup,
  fetchListMyRequestFriend,
  fetchListRequestFriend,
  fetchPhoneBook,
  fetchSuggestFriend,
} from './friendSlice';

import { getValueFromKey } from '@/constants/filterFriend';
import { sortGroup } from '@/utils/groupUtils';

// Spinner
function Spinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-gray-700" />
    </div>
  );
}

export default function Friend() {
  const dispatch = useDispatch();
  const refOriginalGroups = useRef<any[]>([]);

  /* ----------------------------- Redux State ----------------------------- */
  const {
    requestFriends,
    myRequestFriend,
    groups,
    friends,
    phoneBook,
    isLoading,
    suggestFriends,
  } = useSelector((state: any) => state.friend);

  const { user } = useSelector((state: any) => state.global);

  /* ----------------------------- Local UI State ----------------------------- */
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [groupFilterType, setGroupFilterType] = useState('1');
  const [sortFilterType, setSortFilterType] = useState('1');
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);
  const [groupSortKey, setGroupSortKey] = useState(1);

  const [searchValue, setSearchValue] = useState('');
  const [showFilterResult, setShowFilterResult] = useState(false);

  const [singleSearchResult, setSingleSearchResult] = useState([]);
  const [groupSearchResult, setGroupSearchResult] = useState([]);

  /* ----------------------------- Effects ----------------------------- */
  useEffect(() => {
    if (groups.length > 0) {
      const sorted = sortGroup(groups, 1);
      refOriginalGroups.current = sorted;
      setFilteredGroups(sorted);
    }
  }, [groups]);

  useEffect(() => {
    if (activeTab === 2) dispatch(fetchPhoneBook());
  }, [activeTab]);

  useEffect(() => {
    dispatch(fetchListRequestFriend());
    dispatch(fetchListMyRequestFriend());
    dispatch(fetchFriends({ name: '' }));
    dispatch(fetchListGroup({ name: '', type: 2 }));
    dispatch(fetchPhoneBook());
    dispatch(fetchSuggestFriend());
  }, []);

  /* ----------------------------- Handlers ----------------------------- */
  const handleGroupLeftFilter = (key: string) => {
    setGroupFilterType(key);

    if (key === '2') {
      setFilteredGroups(
        refOriginalGroups.current.filter((g) => g.leaderId === user._id),
      );
    } else {
      setFilteredGroups(sortGroup(refOriginalGroups.current, groupSortKey));
    }
  };

  const handleGroupSort = (key: string) => {
    setSortFilterType(key);

    const sortKey = key === '1' ? 1 : 0;
    setGroupSortKey(sortKey);

    setFilteredGroups(sortGroup(filteredGroups, sortKey));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setShowFilterResult(value.trim().length > 0);
  };

  const handleSearchSubmit = async () => {
    try {
      const single = await conversationApi.getListConversations({
        name: searchValue,
        type: 1,
      });
      const multiple = await conversationApi.getListConversations({
        name: searchValue,
        type: 2,
      });

      setSingleSearchResult(single);
      setGroupSearchResult(multiple);
    } catch (_) {}
  };

  /* ----------------------------- UI Render ----------------------------- */
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex w-full h-full">
          {/* ---------------- Sidebar ---------------- */}
          <div className="w-full sm:w-1/2 md:w-7/12 lg:w-1/2 xl:w-5/12 border-r p-3 flex flex-col">
            <SearchContainer
              onSearchChange={handleSearchChange}
              valueText={searchValue}
              onSubmitSearch={handleSearchSubmit}
              isFriendPage
            />

            {showFilterResult ? (
              <FilterContainer
                dataSingle={singleSearchResult}
                dataMulti={groupSearchResult}
                valueText={searchValue}
              />
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <SidebarItem
                    icon="mdi:user"
                    label="Danh sách kết bạn"
                    onClick={() => setActiveTab(0)}
                  />
                  <SidebarItem
                    icon="mdi:account-group"
                    label="Danh sách nhóm"
                    onClick={() => setActiveTab(1)}
                  />
                  <SidebarItem
                    icon="mdi:contacts"
                    label="Danh bạ"
                    onClick={() => setActiveTab(2)}
                  />
                  <Separator className="my-3" />
                </div>

                <Section title={`Bạn bè (${friends.length})`}>
                  <ListFriend data={friends} />
                </Section>
              </div>
            )}
          </div>

          {/* ---------------- Body ---------------- */}
          <div className="hidden sm:flex flex-col flex-1">
            <div className="border-b p-3">
              <HeaderFriend subtab={activeTab} />
            </div>

            <div className="flex-1 overflow-hidden">
              <Scrollbars autoHide autoHideTimeout={800} autoHideDuration={200}>
                {/* Group tab */}
                {activeTab === 1 && (
                  <>
                    <GroupFilters
                      groupCount={filteredGroups.length}
                      groupFilterType={groupFilterType}
                      sortFilterType={sortFilterType}
                      onLeftChange={handleGroupLeftFilter}
                      onRightChange={handleGroupSort}
                    />

                    <div className="p-3">
                      <ListGroup data={filteredGroups} />
                    </div>
                  </>
                )}

                {/* Friend tab */}
                {activeTab === 0 && (
                  <div className="p-3 flex flex-col gap-6">
                    <Section
                      title={`Lời mời kết bạn (${requestFriends.length})`}
                    >
                      <ListRequestFriend data={requestFriends} />
                    </Section>

                    <Section
                      title={`Đã gửi yêu cầu (${myRequestFriend.length})`}
                    >
                      <ListMyFriendRequest data={myRequestFriend} />
                    </Section>

                    <Section title={`Gợi ý kết bạn (${suggestFriends.length})`}>
                      <SuggestList data={suggestFriends} />
                    </Section>
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === 2 && (
                  <div className="p-3 flex flex-col gap-3">
                    {phoneBook?.map(
                      (ele, idx) =>
                        ele.isExists && <ContactItem key={idx} data={ele} />,
                    )}
                  </div>
                )}
              </Scrollbars>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Sub Components ---------------------------- */

function Separator({ className = '' }) {
  return <div className={`h-px bg-gray-200 ${className}`} />;
}

function SidebarItem({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
    >
      <Icon icon={icon} className="text-xl" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium">{title}</div>
      {children}
    </div>
  );
}

function GroupFilters({
  groupCount,
  groupFilterType,
  sortFilterType,
  onLeftChange,
  onRightChange,
}) {
  return (
    <div className="flex justify-between p-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-3 py-2 text-sm"
          >
            <Icon icon="mdi:menu-down" />
            {getValueFromKey('LEFT', groupFilterType)} ({groupCount})
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onLeftChange('1')}>
            Theo tên nhóm A → Z
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onLeftChange('2')}>
            Nhóm tôi quản lý
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-3 py-2 text-sm"
          >
            <Icon icon="mdi:filter" />
            {getValueFromKey('RIGHT', sortFilterType)}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onRightChange('1')}>
            A → Z
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRightChange('2')}>
            Z → A
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
