import { useState, useEffect, useCallback } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  useFloating,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import { Box, Typography, DesignSystemProvider, Button, Flex } from '@strapi/design-system';
import { ActionGroup } from 'src/types';
import { MdArrowBack, MdOutlineTableChart } from 'react-icons/md';

import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useRunCommand } from '../hooks/useRunCommand';

import { TableControlsGrid } from './TableControlsGrid';
import { TableActionButton } from './TableActionButton';
import { TableActionIcon } from './TableActionIcon';
import { TableActionLabel } from './TableActionLabel';
import { TableActionFooter } from './TableActionFooter';
import { TableActionFooterText } from './TableActionFooterText';
import { GoBackButton } from './GoBackButton';
import { actionGroups } from './tableActionGroups';

type ViewMode = 'main' | 'group';

export const TableControls = ({ editor }: { editor: any }) => {
  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewMode>('main');
  const [selectedGroup, setSelectedGroup] = useState<ActionGroup | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), flip(), shift()],
    placement: 'bottom-start',
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
  const runCommand = useRunCommand({
    editor,
    setOpen,
    setCurrentView,
    setSelectedGroup,
  });
  const openGroup = useCallback((group: ActionGroup) => {
    setSelectedGroup(group);
    setCurrentView('group');
    setFocusedIndex(0);
  }, []);
  const goBack = useCallback(() => {
    setCurrentView('main');
    setSelectedGroup(null);
    setFocusedIndex(0);
  }, []);
  const getCurrentItems = useCallback(() => {
    return currentView === 'main' ? actionGroups : selectedGroup?.actions || [];
  }, [currentView, selectedGroup]);

  useKeyboardNavigation({
    open,
    focusedIndex,
    setFocusedIndex,
    currentView,
    setOpen,
    getCurrentItems,
    openGroup,
    goBack,
    runCommand,
  });

  // Reset focus when opening/closing or changing views
  useEffect(() => {
    if (open) {
      setFocusedIndex(0);
    } else {
      setCurrentView('main');
      setSelectedGroup(null);
    }
  }, [open]);

  if (!editor) return null;

  const renderMainView = () => (
    <>
      <Box marginBottom={2}>
        <Typography variant="pi" fontWeight="bold" color="neutral600">
          Table Actions
        </Typography>
      </Box>

      <TableControlsGrid>
        {actionGroups.map((group, index) => (
          <TableActionButton
            flexDirection="column"
            focusedIndex={focusedIndex}
            index={index}
            key={group.label}
            padding={3}
            borderRadius="md"
            onClick={() => openGroup(group)}
            onMouseEnter={() => setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex(-1)}
          >
            <TableActionIcon>{group.icon}</TableActionIcon>
            <TableActionLabel variant="pi" focusedIndex={focusedIndex} index={index}>
              {group.label}
            </TableActionLabel>
          </TableActionButton>
        ))}
      </TableControlsGrid>

      <TableActionFooter>
        <TableActionFooterText variant="pi">Use ↑↓ to navigate, Enter to select, Esc to close</TableActionFooterText>
      </TableActionFooter>
    </>
  );

  const renderGroupView = () => (
    <>
      <Flex
        display="flex"
        marginBottom={2}
        alignItems={{
          initial: 'center',
        }}
      >
        <GoBackButton variant="ghost" size="S" onClick={goBack}>
          <MdArrowBack />
        </GoBackButton>
        <TableActionLabel variant="pi" fontWeight="bold" color="neutral600">
          {selectedGroup?.label} Actions
        </TableActionLabel>
      </Flex>

      <Box>
        {selectedGroup?.actions.map((action, index) => (
          <TableActionButton
            index={index}
            focusedIndex={focusedIndex}
            flexDirection="row"
            justifyContent="start"
            key={action.command}
            padding={2}
            marginBottom={1}
            borderRadius="sm"
            onClick={() => runCommand(action.command)}
            onMouseEnter={() => setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex(-1)}
          >
            <Box display="flex" style={{ alignItems: 'center' }}>
              {action.icon && (
                <TableActionIcon display="flex" marginRight={2}>
                  {action.icon}
                </TableActionIcon>
              )}
              <TableActionLabel index={index} focusedIndex={focusedIndex} variant="pi">
                {action.label}
              </TableActionLabel>
            </Box>
          </TableActionButton>
        ))}
      </Box>
      <TableActionFooter>
        <TableActionFooterText variant="pi">
          Use ↑↓ to navigate, Enter to select, ← or Esc to go back
        </TableActionFooterText>
      </TableActionFooter>
    </>
  );

  return (
    <DesignSystemProvider>
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button ref={refs.setReference} variant={open ? 'secondary' : 'tertiary'} {...getReferenceProps()}>
              <Flex
                display="flex"
                alignItems={{
                  initial: 'center',
                }}
                gap={{
                  initial: 2,
                }}
              >
                <TableActionIcon display="flex">
                  <MdOutlineTableChart />
                </TableActionIcon>
                <TableActionLabel variant="pi" fontWeight="regular">
                  Table Actions
                </TableActionLabel>
              </Flex>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography variant="pi" color="neutral0">
              Table editing tools and actions
            </Typography>
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>

      {open && (
        <FloatingPortal>
          <Box
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              animation: 'slideIn 0.2s ease',
              minWidth: currentView === 'main' ? '280px' : '250px',
              maxWidth: '320px',
              zIndex: 9999,
            }}
            background="neutral0"
            shadow="popupShadow"
            padding={3}
            borderRadius="md"
            {...getFloatingProps()}
          >
            {currentView === 'main' ? renderMainView() : renderGroupView()}
          </Box>
        </FloatingPortal>
      )}
    </DesignSystemProvider>
  );
};
